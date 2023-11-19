const bcrypt = require('bcryptjs');

const encrypt = (pass) => bcrypt.hashSync(pass)
const compareSync = (pass, encryptedPass) => bcrypt.compareSync(pass, encryptedPass)

module.exports = {
  encrypt,
  compareSync
}