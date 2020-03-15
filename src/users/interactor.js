const { UNAUTHORIZED } = require('iate-components').errors
const entity = require('./entity')

const interactor = {
    login: async credentials => {
        const user = await entity.getUserWithCredentials(credentials)
        if (!user) throw new UNAUTHORIZED()
        return entity.generateJWT(user)
    },
}

module.exports = interactor