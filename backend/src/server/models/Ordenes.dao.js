const db = require('../database/db')

const createOrden = async (id_usuario, direccion_envio) => {
    const query = 'INSERT INTO ordenes (id_usuario, direccion_envio, estado) VALUES ($1, $2, $3) RETURNING *;'
    const values = [id_usuario, direccion_envio, 'En proceso']
    return await db.query(query, values)
}

const getOrdenesByUsuario = async (id_usuario) => {
    return await db.query('SELECT * FROM ordenes WHERE id_usuario = $1;', [id_usuario])
}

const getOrdenDetails = async (id) => {
    return await db.query('SELECT * FROM ordenes WHERE id = $1;', [id])
}

const updateOrdenStatus = async (id, estado) => {
    return await db.query('UPDATE ordenes SET estado = $2 WHERE id = $1 RETURNING *;', [id, estado])
}

const cancelOrden = async (id) => {
    return await db.query('DELETE FROM ordenes WHERE id = $1 RETURNING *;', [id])
}

module.exports = {
    createOrden,
    getOrdenesByUsuario,
    getOrdenDetails,
    updateOrdenStatus,
    cancelOrden
}
