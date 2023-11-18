const {
    getInventario,
    getProductoById,
    addProducto,
    updateProducto,
    deleteProducto
} = require('../models/Inventario.dao')


//Endpoint para obtener todos los productos en el inventario.
app.get('/inventario', (_, res) => {
    getInventario()
        .then((productos) => res.status(200).json({ productos }))
        .catch((error) => res.status(500).json(error))
})

//Endpoint para obtener un producto específico por su ID.
app.get('/inventario/:id', (_, res) => {
    getProductoById(req.params.id)
        .then((producto) => res.status(200).json({ producto }))
        .catch((error) => res.status(500).json(error))
})

//Endpoint para agregar un nuevo producto al inventario.
app.post('/inventario', (_, res) => {
    addProducto(req.body)
        .then((producto) => res.status(201).json({ producto }))
        .catch((error) => res.status(500).json(error))
})

//Endpoint para actualizar la información de un producto en el inventario.
app.put('/inventario/:id', (_, res) => {
    updateProducto(req.params.id, req.body)
        .then((producto) => res.status(200).json({ producto }))
        .catch((error) => res.status(500).json(error))
})

//Endpoint para eliminar un producto del inventario.
app.delete('/inventario/:id', (_, res) => {
    deleteProducto(req.params.id)
        .then(() => res.status(200).json({ message: 'Producto eliminado correctamente.' }))
        .catch((error) => res.status(500).json(error));
})
