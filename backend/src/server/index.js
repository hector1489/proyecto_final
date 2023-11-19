require('dotenv').config()

const express = require('express')
const cors = require('cors')


const userRoutes = require('./Routes/userRoutes.js')
const inventoryRoutes = require('./Routes/inventoryRoutes.js')
const orderRoutes = require('./Routes/orderRoutes.js')
const favoriteRoutes = require('./Routes/favoriteRoutes.js')

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', userRoutes)
app.use('/inventory', inventoryRoutes)
app.use('/orders', orderRoutes)
app.use('/favorites', favoriteRoutes)

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'La ruta no se encuentra en este sistema solar.' }))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))