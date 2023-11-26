import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = {
  email: 'docente@desafiolatam.com',
  password: '123456',
  rol: 'Seleccione un rol',
  language: 'Seleccione un Lenguage'
}

const Register = () => {
  const navigate = useNavigate()
  const [signupData, setSignupData] = useState(initialForm)

  const handleSignupChange = (event) => {
    setSignupData({ ...signupData, [event.target.name]: event.target.value })
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault()

    if (
      !signupData.email.trim() ||
      !signupData.password.trim() ||
      signupData.rol === 'Seleccione un rol' ||
      signupData.language === 'Seleccione un Lenguage'
    ) {
      return window.alert('Todos los campos son obligatorios.')
    }

    if (!emailRegex.test(signupData.email)) {
      return window.alert('El formato del email no es correcto!')
    }

    axios
      .post(ENDPOINT.users, signupData)
      .then(() => {
        window.alert('Usuario registrado con éxito.')
        navigate('/login')
      })
      .catch(({ response: { data } }) => {
        console.error(data);
        window.alert(`${data.message}.`)
      })
  }

  useEffect(() => {
    if (window.sessionStorage.getItem('token')) {
      navigate('/perfil')
    }
  }, [navigate])

  return (
    <div className='box-login col-md-6'>
      <Form onSubmit={handleSignupSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmailSignup">
          <Form.Label className='fw-bold text-uppercase'>Registro</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su correo electrónico"
            name="email"
            value={signupData.email}
            onChange={handleSignupChange}
          />
          <Form.Text className="text-muted">
            Nunca compartiremos su correo electrónico con nadie más.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordSignup">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            name="password"
            value={signupData.password}
            onChange={handleSignupChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
          <Form.Label>Repetir Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repetir Contraseña"
            name="repeatPassword"
            value={signupData.repeatPassword}
            onChange={handleSignupChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrarse
        </Button>
      </Form>
    </div>
  )
}

export default Register
