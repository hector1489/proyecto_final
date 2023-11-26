import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DataContext from './context/dataContext'
import './App.css'
import NavbarComponent from './components/Navbar'
import Home from './views/Home'
import NotFound from './views/NotFound'
import Contacts from './views/Contacts'
import Cart from './views/Cart'
import AllProducts from './views/AllProducts'
import LoginSignup from './views/loginSignup'
import DashboardUser from './views/DashboardUser'
import DashboardAdmin from './views/DashboardAdmin'


import { URLBASE } from './config/constans'


function App() {
  const [data, setData] = useState([])
  const [shopCart, setShopCart] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URLBASE)
        const result = await response.json();
        setData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    };
    fetchData()
  }, [])

  const addToCart = ({ id, price, name, img }) => {
    setShopCart((prevShopCart) => {
      const existingProduct = prevShopCart.find((item) => item.id === id)

      if (existingProduct) {
        return prevShopCart?.map((item) =>
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
      );

      return updatedCart.filter((item) => item.count > 0);
    })
  }

  const removeFromCart = (productId) => {
    setShopCart((prevShopCart) =>
      prevShopCart.filter((item) => item.id !== productId)
    )
  }

  const formatNumber = (number) => {
    if (typeof number === 'number' && !isNaN(number)) {
      return number.toLocaleString()
    } else {
      return 'Precio no disponible'
    }
  }

  const addToFavorites = (userId, productId) => {
    const currentDate = new Date().toISOString()
    const isAlreadyInFavorites = data?.favoritos.some(favorite => favorite.id_usuario === userId && favorite.id_inventario === productId)

    if (!isAlreadyInFavorites) {
      const newFavorites = [...data?.favoritos, { id_usuario: userId, id_inventario: productId, fecha_agregado: currentDate }]
      setData((prevData) => ({ ...prevData, favoritos: newFavorites }))
      console.log("Añadido a favoritos:", newFavorites)
    } else {
      console.log("El producto ya está en favoritos")
    }
  }

  const globalState = {
    data,
    shopCart,
    setShopCart,
    addToCart,
    increase,
    decrease,
    removeFromCart,
    formatNumber,
    addToFavorites
  }

  return (
    <DataContext.Provider value={globalState}>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginSignup />} />
          <Route path="/DashboardUser" element={<DashboardUser />} />
          <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/Contacts" element={<Contacts />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  )
}

export default App
