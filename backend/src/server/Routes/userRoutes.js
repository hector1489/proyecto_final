const { verifyToken } = require('../middleware/event.middleware')
const { verifyCredentials } = require('../models/Usuarios.dao')
const { jwtSign } = require('../../utils/jwt')

const {
    findUsuarioByEmail,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../models/Eventos.dao')

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
