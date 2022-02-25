const bcrypt = require('bcrypt')

module.exports.userList = [{
    id: 1,
    name: 'John Doe',
    email: 'john@doe.com',
    password: bcrypt.hashSync('secret', 4)
}, {
    id: 1,
    name: 'Gammer Pro',
    email: 'pro@gammer.com',
    password: bcrypt.hashSync('gamming', 4)
}]