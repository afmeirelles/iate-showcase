const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')
const users = require('../users/translator')

// not sure yet whether jwt generation is a query or a mutation
// tutorials say it's a mutation, but it doesn't change data
const schema = buildSchema(`
    type User {
        id: ID
        email: String
        role: String
    }
    type Query {
        user(id: ID!): User
        users: [User]
        token(email: String!, password: String!): String!
    }
    type Mutation {
        signup(email: String!, password: String!, role: String!): ID
    }`
)

const resolvers = {
    users: users.getAll,
    user: users.getById,
    token: users.login,
    signup: users.create,
}

module.exports = app => {
    // GraphQL route
    app.use('/graphql', express_graphql({
        schema,
        rootValue: resolvers,
        graphiql: true,
    }))
}