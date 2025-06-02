import './usersList.module.css'

import { useEffect, useState } from 'react'
import { api } from "./api/api"
import { Menu } from './components/menu'

function UsersList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchUsers(){
      try{
        const response = await api.get('/users')
        setUsers(response.data)
     // console.log(response.data)
      }catch (err) {
        setError('Error ao carregar usuarios', err)
        
      } finally{
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Carregando usuarios...</p>
  if (error) return <p>{error}</p>

  return (
    <section>
      <Menu/>
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - <i>{item.email}</i>
          </li>
        ))}
      </ul>
    </div>
    </section>

  )
}

export default UsersList