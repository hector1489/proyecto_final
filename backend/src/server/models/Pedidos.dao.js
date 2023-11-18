const db = require('../database/db')

const createPedido = async (id_usuario, direccion_envio) => {
    const query = 'INSERT INTO pedidos (id_usuario, direccion_envio, estado) VALUES ($1, $2, $3) RETURNING *;'
    const values = [id_usuario, direccion_envio, 'En proceso']
    return await db.query(query, values)
}

const getPedidosByUsuario = async (id_usuario) => {
    return await db.query('SELECT * FROM pedidos WHERE id_usuario = $1;', [id_usuario])
}

const getPedidoDetails = async (id) => {
    return await db.query('SELECT * FROM pedidos WHERE id = $1;', [id])
}

const updatePedidoStatus = async (id, estado) => {
    return await db.query('UPDATE pedidos SET estado = $2 WHERE id = $1 RETURNING *;', [id, estado])
}

const cancelPedido = async (id) => {
    return await db.query('DELETE FROM pedidos WHERE id = $1 RETURNING *;', [id])
}

module.exports = {
    createPedido,
    getPedidosByUsuario,
    getPedidoDetails,
    updatePedidoStatus,
    cancelPedido
}
