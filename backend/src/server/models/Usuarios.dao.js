const db = require('../database/db')
const { compareSync } = require('../../utils/bcrypt.js')

const verifyCredentials = async (email, pass) => {
    const [user] = await db('SELECT * FROM usuarios WHERE email = $1;', [email])
    return compareSync(pass, user.pass) && user.es_admin ? [user] : []
}

module.exports = {
    verifyCredentials
}