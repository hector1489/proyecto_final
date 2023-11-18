const express = require('express');
const orderRoutes = express.Router();
const { verifyToken } = require('../middleware/event.middleware')

const {
    createPedido,
    getPedidosByUsuario,
    getPedidoDetails,
    updatePedidoStatus,
    cancelPedido
} = require('../models/Pedidos.dao')


//Endpoint para realizar una nueva orden.
orderRoutes.post('/ordenes', verifyToken, (req, res) => {
    createPedido(req.body, req.user.email)
        .then((orden) => res.status(201).json({ orden }))
        .catch((error) => res.status(500).json(error))
})

//Endpoint para obtener todas las órdenes de un usuario.
orderRoutes.get('/ordenes/:id_usuario', verifyToken, (req, res) => {
    getPedidosByUsuario(req.params.id_usuario, req.user.email)
        .then((ordenes) => res.status(200).json({ ordenes }))
        .catch((error) => res.status(500).json(error))
})

//Endpoint para obtener detalles de una orden específica.
orderRoutes.get('/ordenes/detalle/:id', verifyToken, (req, res) => {
    getPedidoDetails(req.params.id, req.user.email)
        .then((orden) => res.status(200).json({ orden }))
        .catch((error) => res.status(500).json(error))
})

//Endpoint para actualizar el estado de una orden.
orderRoutes.put('/ordenes/:id', verifyToken, (req, res) => {
    updatePedidoStatus(req.params.id, req.body.status, req.user.email)
        .then((orden) => res.status(200).json({ orden }))
        .catch((error) => res.status(500).json(error))
})

//Endpoint para cancelar una orden.
orderRoutes.delete('/ordenes/:id', (_, res) => {
    cancelPedido(req.params.id)
        .then(() => res.status(200).json({  }))
        .catch((error) => res.status(500).json(error))
})

module.exports = orderRoutes