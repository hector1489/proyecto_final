import { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DataContext from '../context/dataContext'
import useAdmins from '../hooks/useAdmins'
import useUsers from '../hooks/useUsers'
import { ENDPOINT } from '../config/constans'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = { email: 'docente@desafiolatam.com', password: '123456' }

function LoginComponents() {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)
  const { setDeveloper } = useContext(DataContext)
  const { setAdmins } = useAdmins()
  const { setUsers } = useUsers()

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

  const handleForm = (event) => {
    event.preventDefault()

    if (!user.email.trim() || !user.password.trim()) {
      return window.alert('Email y contraseña son obligatorios.')
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto.')
    }

    axios.post(ENDPOINT.login, user)
      .then(({ data }) => {
        window.sessionStorage.setItem('token', data.token)
        window.alert('Usuario identificado con éxito.')
        setDeveloper({})

        if (user.email === 'admin@example.com') {
          setAdmins(true)
        } else {
          setUsers(true)
        }

        navigate('/perfil')
      })
      .catch(({ response: { data } }) => {
        console.error(data)
        window.alert(`${data.message}.`)
      })
  }

  return (
      <div className='box-login col-md-6'>
        <Form onSubmit={handleForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='fw-bold text-uppercase'>Inicio de sesión</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo electrónico"
              name="email"
              value={user.email}
              onChange={handleUser}
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
              name="password"
              value={user.password}
              onChange={handleUser}
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

export default LoginComponents
