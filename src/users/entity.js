const _ = require('lodash')
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
    getById: adapter.getById,
    getAll: async () => {
        const users = await adapter.getAll()
        return _.map(users, user => ({
            ..._.omit(user, '_id'),
            id: user._id
        }
    ))
    },
    create: async user => {
        const { insertedId } = await adapter.create({
            ...user,
            password: hash(user.password)
        })
        return insertedId
    }
}

module.exports = entity