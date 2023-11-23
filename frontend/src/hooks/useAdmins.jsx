import { useState } from 'react'

const useAdmins = () => {
  const [admins, setAdmins] = useState(null)

  const setAdminsData = (adminData) => setAdmins(adminData)

  return { getAdmins: admins, setAdmins: setAdminsData }
}

export default useAdmins

