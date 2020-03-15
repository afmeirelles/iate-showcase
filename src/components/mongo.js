const MongoClient = require('mongodb').MongoClient
const configs = require('./configs')

const url = configs('MONGO_HOST')
const database = configs('MONGO_DB_NAME')
const user = configs('MONGO_DB_USER')
const password = configs('MONGO_DB_PASSWORD')

let dbInstance // singleton db instance

const connect = async () => {
    try {
        if (!dbInstance) {
            const client = await MongoClient.connect(`${url}/${database}`, {
                useUnifiedTopology: true,
                auth: {
                    user,
                    password,
                }
            })
            dbInstance = await client.db()
        }
        return dbInstance
    } catch (error) {
        console.log(`Error connecting to mongodb: ${error.message}`)
    }
}

module.exports = { connect }
