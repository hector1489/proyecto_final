import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { jwtDecode } from 'jwt-decode'

const DashboardUser = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    console.log('Token en DashboardUser:', token)

    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        console.log(decodedToken)
        setUserData(decodedToken)
      } catch (error) {
        console.error('Error al decodificar el token:', error)
      }
    } else {
      console.error('No se encontró un token en la sesión.')
    }
  }, [])

  return (
    <Container>
      <Row>
        <Col className='dashboard text-center justify-content-center'>
          <div className="half-page-user ">
            {userData ? (
              <p>Bienvenido, {userData.email}!</p>
            ) : (
              <p>No se ha iniciado sesión.</p>
            )}
          </div>
        </Col>
        <Col className='dashboard text-center justify-content-center'>
          <div className="half-page">Aqui van los pedidos</div>
          <div className="half-page">Aqui van los favoritos</div>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardUser
