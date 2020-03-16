const { UNAUTHORIZED } = require('iate-components').errors
const entity = require('./entity')

const interactor = {
    login: async credentials => {
        const user = await entity.getUserWithCredentials(credentials)
        if (!user) throw new UNAUTHORIZED()
        return entity.generateJWT(user)
    },
    getById: entity.getById,
    getAll: entity.getAll,
    create: entity.create,
}

module.exports = interactor