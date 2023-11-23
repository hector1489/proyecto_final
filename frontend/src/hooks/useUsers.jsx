import { useState } from 'react'

const useUsers = () => {
  const [users, setUsers] = useState(null)

  const setUsersData = (userData) => setUsers(userData)

  return { getUsers: users, setUsers: setUsersData }
}

export default useUsers
