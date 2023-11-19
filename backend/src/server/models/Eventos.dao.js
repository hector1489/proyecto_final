const db = require('../database/db.js')
const { encrypt } = require('../../utils/bcrypt')


const findUsuarioByEmail = async (email) => {
    try {
        const result = await db('SELECT * FROM usuarios WHERE email = $1;', [email]);
        return result;
    } catch (error) {
        throw error;
    }
}

const createUsuario = async ({ email, pass, es_admin }) => {
    try {
        const query = 'INSERT INTO usuarios (email, pass, es_admin) VALUES ($1, $2, $3) RETURNING *;'
        const values = [email, encrypt(pass), es_admin];
        const result = await db(query, values);
        return result;
    } catch (error) {
        throw error
    }
}


const updateUsuario = async (id, { email, pass, es_admin }) => {
    try {
        const query = 'UPDATE usuarios SET email = $2, pass = $3, es_admin = $4 WHERE id = $1 RETURNING *;'
        const values = [id, email, encrypt(pass), es_admin];
        const result = await db(query, values)
        return result;
    } catch (error) {
        throw error
    }
}

const deleteUsuario = async (id) => {
    try {
        const result = await db('DELETE FROM usuarios WHERE id = $1 RETURNING *;', [id]);
        return result;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    findUsuarioByEmail,
    createUsuario,
    updateUsuario,
    deleteUsuario
}
