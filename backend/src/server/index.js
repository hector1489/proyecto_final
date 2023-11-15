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

app.post('/login', (req, res) => {
    verifyCredentials(req.body.email, req.body.pass)
        .then((user) => {
            user.length > 0
                ? res.status(200).json({ token: jwtSign({ email: req.body.email }) })
                : res.status(400).json({ code: 404, message: 'Resource not found.' })
        })
        .catch((error) => res.status(500).json(error))
})

app.get('/usuarios/no_existe_aun', verifyToken, (_, res) => {
    findUsuarios()
        .then((events) => res.status(200).json({ events }))
        .catch((error) => res.status(500).json(error))
})

app.get('/usuarios', verifyToken, (req, res) => {
    findUsuarioByEmail(req.user.email)
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(500).json(error))
    })

app.post('/usuarios', (req, res) => {
    createUsuario(req.body)
        .then((events) => res.status(201).json({ events }))
        .catch((error) => res.status(500).json(error))
})

app.put('/usuarios/:id', verifyToken, (req, res) => {
    updateUsuario(req.params.id, req.body)
        .then((events) => res.status(200).json({ events }))
        .catch((error) => res.status(500).json(error))
})

app.delete('/usuarios/:id', verifyToken, (req, res) => {
    deleteUsuario(req.params.id)
        .then((events) => res.status(200).json({ events }))
        .catch((error) => res.status(500).json(error))
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'La ruta no se encuentra en este sistema solar.' }))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))