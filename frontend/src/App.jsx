import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DataContext from './context/dataContext'
import './App.css'
import NavbarComponent from './components/Navbar'
import Home from './views/Home'
import NotFound from './views/NotFound'
import Contacts from './views/Contacts'

const urlBaseServer = 'http://localhost:3000'

function App() {
  const [data, setData] = useState([])
  const [shopCart, setShopCart] = useState([])

  /*useEffect(() => {
    fetchData(`${urlBaseServer}`)
  }, [])*/

  const fetchData = async () => {
    try {
      const response = await fetch(`${urlBaseServer}/api/products`)
      const jsonData = await response.json()
      setData(jsonData)
    } catch (error) {
      console.error('Error al obtener datos del servidor:', error)
    }
  }

  const addToCart = ({ id, price, name, img }) => {
    setShopCart((prevShopCart) => {
      const existingProduct = prevShopCart.find((item) => item.id === id)

      if (existingProduct) {
        return prevShopCart.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
        )
      } else {
        return [...prevShopCart, { id, price, name, img, count: 1 }]
      }
    })
  }

  const increase = (productId) => {
    setShopCart((prevShopCart) =>
      prevShopCart.map((item) =>
        item.id === productId ? { ...item, count: item.count + 1 } : item
      )
    )
  }

  const decrease = (productId) => {
    setShopCart((prevShopCart) => {
      const updatedCart = prevShopCart.map((item) =>
        item.id === productId
          ? { ...item, count: item.count - 1 }
          : item
      )

      return updatedCart.filter((item) => item.count > 0)
    })
  }

  const removeFromCart = (productId) => {
    setShopCart((prevShopCart) =>
      prevShopCart.filter((item) => item.id !== productId)
    )
  }

  const formatNumber = (number) => {
    return number.toLocaleString()
  }

  const globalState = {
    data,
    setData,
    shopCart,
    setShopCart,
    addToCart,
    increase,
    decrease,
    removeFromCart,
    formatNumber,
  }

  return (
    <DataContext.Provider value={globalState}>
      <BrowserRouter>
        <div className="App">
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/Contacts" element={<Contacts />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataContext.Provider>
  )
}

export default App
