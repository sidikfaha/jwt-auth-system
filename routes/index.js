var express = require('express');
const { isAuthenticated } = require('../middlewares/is-authenticated');
var router = express.Router();

/**
 * Creating a ptotected route.
 */
router.get('/protected', isAuthenticated, function(req, res) {
    res.json({
        authenticated: true,
        user: req['user']
    });
});

module.exports = router;