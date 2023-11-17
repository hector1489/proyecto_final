require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { jwtSign } = require('../utils/jwt')
const { verifyToken } = require('./middleware/event.middleware')
const { verifyCredentials } = require('./models/Usuarios.dao')
const {
    findUsuarios,
    findUsuarioByEmail,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('./models/Eventos.dao')

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

/*Users*/

// Endpoint para manejar la autenticación y generar un token
app.post('/login', (req, res) => {
    verifyCredentials(req.body.email, req.body.pass)
        .then((user) => {
            user.length > 0
                ? res.status(200).json({ token: jwtSign({ email: req.body.email }) })
                : res.status(400).json({ code: 404, message: 'Resource not found.' })
        })
        .catch((error) => res.status(500).json(error))
})

// Endpoint para obtener todos los usuarios (requiere token)
app.get('/usuarios/', verifyToken, (_, res) => {
    findUsuarios()
        .then((events) => res.status(200).json({ events }))
        .catch((error) => res.status(500).json(error))
})

// Endpoint para obtener un usuario por correo electrónico (requiere token)
app.get('/usuarios', verifyToken, (req, res) => {
    findUsuarioByEmail(req.user.email)
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(500).json(error))
    })

// Endpoint para crear un nuevo usuario
app.post('/usuarios', (req, res) => {
    createUsuario(req.body)
        .then((events) => res.status(201).json({ events }))
        .catch((error) => res.status(500).json(error))
})

// Endpoint para actualizar un usuario (requiere token)
app.put('/usuarios/:id', verifyToken, (req, res) => {
    updateUsuario(req.params.id, req.body)
        .then((events) => res.status(200).json({ events }))
        .catch((error) => res.status(500).json(error))
})

// Endpoint para eliminar un usuario (requiere token)
app.delete('/usuarios/:id', verifyToken, (req, res) => {
    deleteUsuario(req.params.id)
        .then((events) => res.status(200).json({ events }))
        .catch((error) => res.status(500).json(error))
})

/*Inventory*/

//Endpoint para obtener todos los productos en el inventario.
app.get('/inventario', (_, res) => {

})

//Endpoint para obtener un producto específico por su ID.
app.get('/inventario/:id', (_, res) => {

})

//Endpoint para agregar un nuevo producto al inventario.
app.post('/inventario', (_, res) => {

})

//Endpoint para actualizar la información de un producto en el inventario.
app.put('/inventario/:id', (_, res) => {

})

//Endpoint para eliminar un producto del inventario.
app.delete('/inventario/:id', (_, res) => {

})

/* orders*/

//Endpoint para realizar una nueva orden.
app.post('/ordenes', (_, res) => {

})

//Endpoint para obtener todas las órdenes de un usuario.
app.get('/ordenes/:id_usuario', (_, res) => {

})

//Endpoint para obtener detalles de una orden específica.
app.get('/ordenes/detalle/:id', (_, res) => {

})

//Endpoint para actualizar el estado de una orden.
app.put('/ordenes/:id', (_, res) => {

})

//Endpoint para cancelar una orden.
app.delete('/ordenes/:id', (_, res) => {

})

/*Favorites*/

//Endpoint para agregar un producto a la lista de favoritos.
app.post('/favoritos', (_, res) => {

})

//Endpoint para obtener todos los productos favoritos de un usuario.
app.get('/favoritos/:id_usuario', (_, res) => {

})

//Endpoint para eliminar un producto de la lista de favoritos.
app.delete('/favoritos/:id', (_, res) => {

})


app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'La ruta no se encuentra en este sistema solar.' }))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))