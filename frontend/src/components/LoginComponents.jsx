import { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DataContext from '../context/dataContext'
import useAdmins from '../hooks/useAdmins'
import useUsers from '../hooks/useUsers'
import { ENDPOINT } from '../config/constans'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = { email: 'godUsopp@example.com', pass: '123456' }

function LoginComponent() {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)
  const { setDeveloper } = useContext(DataContext)
  const { setAdmins } = useAdmins()
  const { setUsers } = useUsers()

  const handleUserChange = (event) => setUser({ ...user, [event.target.name]: event.target.value })

  const validateForm = () => {
    if (!user.email.trim() || !user.pass.trim()) {
      alert('Por favor, complete el correo electrónico y la contraseña.')
      return false
    }

    if (!emailRegex.test(user.email)) {
      alert('El formato del correo electrónico no es válido.');
      return false
    }

    return true
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { data } = await axios.post(ENDPOINT.login, user)
      window.sessionStorage.setItem('token', data.token)
      alert('Usuario identificado con éxito.')
      setDeveloper({})

      if (user.email === 'admin@example.com') {
        setAdmins(true)
      } else {
        setUsers(true)
      }

      console.log('Token antes de la redirección:', window.sessionStorage.getItem('token'))
      navigate('/DashboardUser')
    } catch (error) {
      console.error(error.response?.data || 'Error desconocido')
      alert('Error al iniciar sesión. Por favor, verifique sus credenciales.')
    }
  }

  return (
    <div className='box-login col-md-6'>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='fw-bold text-uppercase'>Inicio de sesión</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su correo electrónico"
            name="email"
            value={user.email}
            onChange={handleUserChange}
          />
          <Form.Text className="text-muted">
            Nunca compartiremos su correo electrónico con nadie más.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            name="pass"
            value={user.pass}
            onChange={handleUserChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Recuérdame" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Iniciar sesión
        </Button>
      </Form>
    </div>
  )
}

export default LoginComponent
