import { useEffect, useState, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { jwtDecode } from 'jwt-decode'
import DataContext from '../context/dataContext'
import CardComponents from '../components/Cards'

const DashboardUser = () => {
  const [userData, setUserData] = useState(null)
  const [favorites, setFavorites] = useState([])
  const { getFavorites } = useContext(DataContext)

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')

    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        setUserData(decodedToken)
        getFavorites()
      } catch (error) {
        console.error('Error al decodificar el token:', error)
      }
    } else {
      console.error('No se encontró un token en la sesión.')
    }
  }, [getFavorites])

  return (
    <Container>
      <Row>
        <Col className='dashboard text-center justify-content-center'>
          <div className="half-page-user">
            {userData ? (
              <p>Bienvenido, {userData.email}!</p>
            ) : (
              <p>No se ha iniciado sesión.</p>
            )}
          </div>
        </Col>
        <Col className='dashboard text-center justify-content-center'>
          <div className="half-page">Aqui van los pedidos</div>
          <div className="half-page">
            <h2>Favoritos</h2>
            {favorites.map((favorite) => (
              <CardComponents key={favorite.id_inventario} itemId={favorite.id_inventario} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardUser
