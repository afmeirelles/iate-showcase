const validator = require('iate-components').validator
const { toHttp } = require('iate-components').errors
const interactor = require('./interactor')

const translator = {
    login: async (req, res) => {
        try {
            // validate payload
            validator({
                type: 'object',
                required: [ 'email', 'password' ]
            }, req.body)
            // check credentials and return jwt
            res.json({
                token: await interactor.login(req.body)
            })
        } catch (error) {
            toHttp(error, res)
        }
    }
}

module.exports = translator