const db = require('../database/db.js')

const getInventario = async () => {
    return await db('SELECT * FROM inventario;')
}

const getProductoById = async (id) => {
    return await db('SELECT * FROM inventario WHERE id = $1;', [id])
}

const addProducto = async ({ nombre, categoria, envio, precio, stock, id_usuario, id_pedido }) => {
    try {
        const query = 'INSERT INTO inventario (nombre, categoria, envio, precio, stock, id_usuario, id_pedido) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;'
        const values = [nombre, categoria, envio, precio, stock, id_usuario, id_pedido]
        const result = await db(query, values)
        return result
    } catch (error) {
        throw error
    }
}

const updateProducto = async (id, { nombre, categoria, envio, precio, stock, id_usuario }) => {
    try {
        const query = 'UPDATE inventario SET nombre = $2, categoria = $3, envio = $4, precio = $5, stock = $6, id_usuario = $7 WHERE id = $1 RETURNING *;'
        const values = [id, nombre, categoria, envio, precio, stock, id_usuario]
        const result = await db(query, values)
        return result
    } catch (error) {
        console.error('Error al actualizar el producto:', error)
        throw error
    }
}

const deleteProducto = async (id) => {
    try {
        const result = await db('DELETE FROM inventario WHERE id = $1 RETURNING *;', [id])
        return result
    } catch (error) {
        console.error('Error al eliminar el producto:', error)
        throw error
    }
}

module.exports = {
    getInventario,
    getProductoById,
    addProducto,
    updateProducto,
    deleteProducto
}
