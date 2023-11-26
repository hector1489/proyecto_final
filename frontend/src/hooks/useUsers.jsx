// useUsers.js
import { useState } from 'react'

const useUsers = () => {
  const [userData, setUserData] = useState(null)

  return { getUserData: userData, setUserData }
}

export default useUsers
