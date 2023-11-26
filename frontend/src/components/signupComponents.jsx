import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = {
  email: 'godUsopp@example.com',
  pass: '',
  confirmPassword: '',
  es_admin: false,
}

const Register = () => {
  const navigate = useNavigate()
  const [signupData, setSignupData] = useState(initialForm)

  const handleSignupChange = (event) => {
    setSignupData({ ...signupData, [event.target.name]: event.target.value })
  }

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    if (!signupData.email.trim() || !signupData.pass.trim() || !signupData.confirmPassword.trim()) {
      return window.alert('Todos los campos son obligatorios.')
    }

    if (signupData.pass !== signupData.confirmPassword) {
      return window.alert('Las contraseñas no coinciden.')
    }

    if (!emailRegex.test(signupData.email)) {
      return window.alert('El formato del email no es correcto.')
    }

    axios
      .post(ENDPOINT.register, signupData)
      .then((response) => {
        const token = response.data.token
        window.sessionStorage.setItem('token', token)
        window.alert('Usuario registrado con éxito.')
        navigate('/DashboardUser')
      })
      .catch((error) => {
        console.error(error);
        window.alert('Error al registrar usuario.')
      })

  }


  useEffect(() => {
    if (window.sessionStorage.getItem('token')) {
      navigate('/DashboardUser')
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
            name="pass"
            value={signupData.pass}
            onChange={handleSignupChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmar Contraseña"
            name="confirmPassword"
            value={signupData.confirmPassword}
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
