import { useContext } from "react"
import { Card, Button } from 'react-bootstrap'
import DataContext from '../context/dataContext'

function CardComponents() {
  const { data, addToCart, formatNumber, addToFavorites } = useContext(DataContext)

  const handleAddToFavorites = (id) => {
    const userId = "123e4567-e89b-12d3-a456-426614174001"
    addToFavorites(userId, id)
  }

  const getImageUrl = (itemId) => {
    const imagen = data?.imagenes_producto.find((img) => img.id_inventario === itemId)
    return imagen ? imagen.url : ''
  }

  return (
    <>
      {data?.inventario?.map((item) => (
        <Card key={item?.id} className="p-2">
          <Card.Img variant="top" src={getImageUrl(item?.id)} />
          <Card.Body>
            <div className="ms-auto">
              <Card.Title style={{ textTransform: 'capitalize' }}>{item?.nombre}</Card.Title>
              <Card.Text className="fw-bold fs-5">
                ${formatNumber(item?.precio)}
              </Card.Text>
              <Button variant="success" className="me-3" onClick={() => addToCart(item)}>
                add 🛒
              </Button>
              <Button variant="info text-white text-decoration-none" onClick={() => handleAddToFavorites(item?.id)}>
                add favorites
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default CardComponents

