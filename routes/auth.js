const express = require('express')
const { userList } = require('../dummy-data/users')
const { throwUnauthenticated } = require('../middlewares/is-authenticated')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



router.post('/login', function(req, res, next) {
    try {
        const email = req.body['email'] || ''
        const password = req.body['password'] || ''

        const user = userList.filter(u => u.email === email)[0];

        if (!user) {
            throwUnauthenticated(res, "Email incorrect.")
            return
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throwUnauthenticated(res, 'Password incorrect.')
        }

        const access_token = jwt.sign(user, process.env.JWT_SECRET, { algorithm: 'HS512' })
        res.json({ user, access_token })
    } catch (exception) {
        res.status(500).json(exception)
    }

});

module.exports = router;