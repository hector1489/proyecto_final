import { useContext, useEffect, useState } from "react"
import { Card, Button } from 'react-bootstrap'
import DataContext from '../context/dataContext'
import { ENDPOINT } from "../config/constans"

function CardComponents() {
  const { addToCart, formatNumber, addToFavorites } = useContext(DataContext)
  const [inventoryData, setInventoryData] = useState([])

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(ENDPOINT.inventory)
        const result = await response.json()
        setInventoryData(result)
      } catch (error) {
        console.error("Error fetching inventory data:", error)
      }
    };

    fetchInventory()
  }, [])

  const handleAddToFavorites = (id) => {
    const userId = "123e4567-e89b-12d3-a456-426614174001"
    addToFavorites(userId, id)
  }

  const getImageUrl = (itemId) => {
    const imagen = inventoryData.productos.find((item) => item.id === itemId)?.url
    return imagen || ''
  }

  return (
    <>
      {inventoryData?.productos?.map((item) => (
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

