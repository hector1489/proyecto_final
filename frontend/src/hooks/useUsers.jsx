import { useState } from 'react'

const useUsers = () => {
  const [users, setUsers] = useState(false)

  const setUsersData = (userData) => setUsers(userData)

  return { getUsers: users, setUsers: setUsersData }
}

export default useUsers
