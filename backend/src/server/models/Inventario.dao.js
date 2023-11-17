const db = require('../database/db')

const getInventario = async () => {
    return await db.query('SELECT * FROM inventario;')
}

const getProductoById = async (id) => {
    return await db.query('SELECT * FROM inventario WHERE id = $1;', [id])
}

const addProducto = async ({ nombre, categoria, envio, precio, stock, id_usuario }) => {
    const query = 'INSERT INTO inventario (nombre, categoria, envio, precio, stock, id_usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;'
    const values = [nombre, categoria, envio, precio, stock, id_usuario]
    return await db.query(query, values)
}

const updateProducto = async (id, { nombre, categoria, envio, precio, stock, id_usuario }) => {
    const query = 'UPDATE inventario SET nombre = $2, categoria = $3, envio = $4, precio = $5, stock = $6, id_usuario = $7 WHERE id = $1 RETURNING *;'
    const values = [id, nombre, categoria, envio, precio, stock, id_usuario];
    return await db.query(query, values)
}

const deleteProducto = async (id) => {
    return await db.query('DELETE FROM inventario WHERE id = $1 RETURNING *;', [id])
}

module.exports = {
    getInventario,
    getProductoById,
    addProducto,
    updateProducto,
    deleteProducto
}
