import { useState, useEffect} from 'react';
import {api} from './api/api'
import './app.module.css'
import { useNavigate } from 'react-router'



function App() {
  const navigate = useNavigate();

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[user, setUser] = useState(null)
  const[message, setMessage] = useState('')


  useEffect(() =>{
      const storedUser = localStorage.getItem('user')
      if(storedUser){
        setUser(JSON.parse(storedUser))
        navigate('/userList')
      }
  },[navigate])

  const handleLogin = async(e) =>{
    e.preventDefault()
    try {
      const response = await api.post('/login', {email, password})
      const user = response.data

      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      navigate('/userList')
      
    } catch (error) {
      setMessage('Erro no login' + (error.response?.data?.message || 'verefique os dados'))
    }
  }

  return (
    <>
      <div style={{padding: '2rem'}}>
        <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}required/>
        <input type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)}required/>
        <button type='submit'>Entrar</button>
        <p>{message}</p>
        </form>
      </div>
    </>
  )
}

export default App
