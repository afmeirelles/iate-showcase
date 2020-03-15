const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { UNAUTHORIZED, toHttp } = require('iate-components').errors

const publicPaths = [
    '/',
    '/login'
]

/** TODO: analyze whether we should sign tokens with user password hash
 * instead of application's. That's because here we're only checking if 
 * the token is valid, but user can change his/her password and the
 * token will still be valid
 */
module.exports = (req, res, next) => {
    // if path is public, skip jwt validation
    if (_.includes(publicPaths, req.path)) return next()
    if (!req.token) return toHttp(new UNAUTHORIZED(), res)
    try {
        const { client_id, email, role } = jwt.verify(req.token, 'notASecret')
        req.user = { id: client_id, email, role }
    } catch (error) {
        toHttp(new UNAUTHORIZED(error.message), res)
    }
    next()
}