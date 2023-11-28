import { useContext, useEffect, useState } from "react"
import { Card, Button } from 'react-bootstrap'
import DataContext from '../context/dataContext'
import { ENDPOINT } from "../config/constans"
import { useNavigate } from "react-router-dom"

function CardComponents() {
  const {
    addToCart,
    formatNumber,
    deletefavorite,
    like
  } = useContext(DataContext)
  const navigate = useNavigate()

  const [inventoryData, setInventoryData] = useState([])

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(ENDPOINT.inventory)
        const result = await response.json()
        setInventoryData(result)
      } catch (error) {
        console.error("Error al obtener datos del inventario:", error)
      }
    }

    fetchInventory()
  }, [])

  const getImageUrl = (itemId) => {
    const imagen = inventoryData.productos.find((item) => item.id === itemId)?.url
    return imagen || ''
  }

  const handleProduct = (id) => {
    navigate(`/details/${id}`)
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
                agregar 🛒
              </Button>
              <Button variant="info text-white text-decoration-none" onClick={() => handleProduct(item?.id)}>
                Detalle
              </Button>
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <i
                    onClick={() => like(item.id_inventario)}
                    className={`fa-heart fa-xl ${item.likes ? 'fa-solid' : 'fa-regular'}`}
                  />
                  <span className='ms-1'>{item.likes}</span>
                </div>
                <i onClick={() => deletefavorite(item.id_inventario)} className='fa-solid fa-x' />
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default CardComponents
