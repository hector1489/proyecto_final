const db = require('../database/db')
const { encrypt } = require('../../utils/bcrypt')

const findUsuarios = async () => await db.query('SELECT * FROM usuarios;')

const findUsuarioByEmail = async (email) => await db.query('SELECT * FROM usuarios WHERE email = $1;', [email])

const createUsuario = async ({ email, pass, es_admin }) => {
    const query = 'INSERT INTO usuarios (email, pass, es_admin) VALUES ($1, $2, $3) RETURNING *;'
    const values = [email, encrypt(pass), es_admin]
    return await db.query(query, values)
}

const updateUsuario = async (id, { email, pass, es_admin }) => {
    const query = 'UPDATE usuarios SET email = $2, pass = $3, es_admin = $4 WHERE id = $1 RETURNING *;'
    const values = [id, email, encrypt(pass), es_admin]
    return await db.query(query, values)
}

const deleteUsuario = async (id) => await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *;', [id])

module.exports = {
    findUsuarios,
    findUsuarioByEmail,
    createUsuario,
    updateUsuario,
    deleteUsuario
}
