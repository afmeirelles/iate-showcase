const hash = require('../components/hash')
const adapter = require('./adapter')

const entity = {
    getUserWithCredentials: async ({ email, password }) => {
        return adapter.getUserWithCredentials({
            email,
            password: hash(password),
        })
    },
    generateJWT: ({ _id: client_id, email, role }) => {
        return adapter.generateJWT({ client_id, email, role })
    },
}

module.exports = entity