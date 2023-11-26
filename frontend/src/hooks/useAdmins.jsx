import { useState } from 'react'

const useAdmins = () => {
  const [admins, setAdmins] = useState(false)

  const setAdminsData = (adminData) => setAdmins(adminData)

  return { getAdmins: admins, setAdmins: setAdminsData }
}

export default useAdmins
