const { Request, Response, NextFunction } = require('express')
const jwt = require('jsonwebtoken')

/**
 * Verify the if the request is authenticated or not
 * If it is then we go to the next request, else we throw an error 401 Unauthenticated
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
module.exports.isAuthenticated = (req, res, next) => {
    try {
        // Get if request is signed with an authorization token
        let signature = req.headers['authorization']

        if (signature) {
            signature = signature.split(' ')
            const authType = signature[0] // Exracting the token type
            const token = signature[1] // Extracting the token

            // If the request doesn't use the right token type. Require 'Bearer' type
            if (authType !== 'Bearer') {
                this.throwUnauthenticated(res)
                return
            }

            user = jwt.verify(token, process.env.JWT_SECRET) // Verify the token and throw and error if the token signature is invalid

            if (!user) {
                this.throwUnauthenticated(res, "Invalid token.")
                return
            }

            // After token verification, the user's basic data will be availabe
            // there => `req.user` or `req['user']`
            req['user'] = user;
            next()
            return
        }
        this.throwUnauthenticated(res)
    } catch (exception) {
        res.status(500).json(exception)
    }
}

/**
 * Signature missing or is wrong
 * @param {Response} res 
 */
module.exports.throwUnauthenticated = (res, message = 'Unauthenticated') => {
    res.status(401).json({ code: 401, message })
}