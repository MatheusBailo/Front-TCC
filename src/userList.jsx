import './userList.module.css'

import { api } from './api/api'
import { useEffect,useState } from 'react'


function Userlist() {
  const[users, setUsers] = useState([])
  const[loading, setLoading] = useState(true)
  const[error, setError] = useState('')

   useEffect(() =>{
    async function fetchUsers(){
      try {
        const response = await api.get('/users')
        setUsers(response.data)
        
      } catch (err) {
        setError('Erro ao carregar usuarios', err)
      }finally{
        setLoading(false)
      }
    }

    fetchUsers()

    
   },[])

   if (loading) return <p>Carregando usuarios..</p>
   if (error) return <p>{error}</p>

  return (
    <div style={{padding: '2ren'}}>
      <h1>Lista de usuario</h1>
      <ul>
        {users.map((item) =>(
          <li key={item.id}>
            <strong>{item.name}</strong> - <i>{item.email}</i>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Userlist