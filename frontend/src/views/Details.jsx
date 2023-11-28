import { useEffect, useContext, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DataContext from '../context/dataContext'
import { URLBASE } from '../config/constans'

const Details = () => {
  const { id } = useParams()
  const { addToCart, formatNumber } = useContext(DataContext)
  const [item, setItem] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URLBASE}/inventory/inventario/${id}`)
        const itemData = response.data.producto[0];
        setItem(itemData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [id])

  const getImageUrl = (itemId) => {
    const imagen = item?.url || ''
    return imagen
  }


  if (!item) {
    return <div>Product not found.</div>
  }

  return (
    <div className="box-details">
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
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Details
