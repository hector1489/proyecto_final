const db = require('../database/db')

const addFavorito = async (id_usuario, id_inventario) => {
    const query = 'INSERT INTO favoritos (id_usuario, id_inventario) VALUES ($1, $2) RETURNING *;'
    const values = [id_usuario, id_inventario]
    return await db.query(query, values)
}

const getFavoritosByUsuario = async (id_usuario) => {
    return await db.query('SELECT * FROM favoritos WHERE id_usuario = $1;', [id_usuario])
}

const removeFavorito = async (id) => {
    return await db.query('DELETE FROM favoritos WHERE id = $1 RETURNING *;', [id])
}

module.exports = {
    addFavorito,
    getFavoritosByUsuario,
    removeFavorito
}
