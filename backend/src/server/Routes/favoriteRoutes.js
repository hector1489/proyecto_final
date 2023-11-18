const express = require('express')
const favoriteRoutes = express.Router()

const { verifyToken } = require('../middleware/event.middleware')

const {
    addFavorito,
    getFavoritosByUsuario,
    removeFavorito
} = require('../models/Favoritos.dao')



//Endpoint para agregar un producto a la lista de favoritos.
favoriteRoutes.post('/favoritos', verifyToken, (req, res) => {
    addFavorito(req.body.producto_id, req.user.email)
        .then((favorito) => res.status(201).json({ favorito }))
        .catch((error) => res.status(500).json(error))
})

//Endpoint para obtener todos los productos favoritos de un usuario.
favoriteRoutes.get('/favoritos/:id_usuario', verifyToken, (req, res) => {
    getFavoritosByUsuario(req.params.id_usuario, req.user.email)
        .then((favoritos) => res.status(200).json({ favoritos }))
        .catch((error) => res.status(500).json(error))
})

//Endpoint para eliminar un producto de la lista de favoritos.
favoriteRoutes.delete('/favoritos/:id', verifyToken, (req, res) => {
    removeFavorito(req.params.id, req.user.email)
        .then(() => res.status(200).json({ message: 'Producto eliminado de favoritos correctamente.' }))
        .catch((error) => res.status(500).json(error))
})

module.exports = favoriteRoutes