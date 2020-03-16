const jwt = require('jsonwebtoken')
const configs = require('../components/configs')
const mongo = require('../components/mongo')

const JWT_SECRET = configs('JWT_SECRET')
const TOKEN_EXPIRATION_IN = configs('TOKEN_EXPIRATION_IN')
const COLLECTION = 'users'

const adapter = {
    getUserWithCredentials: async ({ email, password }) => {
        const db = await mongo.connect()
        return db
            .collection(COLLECTION)
            .findOne({
                email,
                password
            })
    },
    generateJWT: data => {
        return jwt.sign(data, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION_IN || '7d' })
    },
    getById: async id => {
        const db = await mongo.connect()
        return db
            .collection(COLLECTION)
            .findOne(mongo.ObjectId(id))
    },
    getAll: async id => {
        const db = await mongo.connect()
        return db
            .collection(COLLECTION)
            .find()
            .toArray()
    },
    create: async user => {
        const db = await mongo.connect()
        return db
            .collection(COLLECTION)
            .insertOne(user)
    }
}

module.exports = adapter