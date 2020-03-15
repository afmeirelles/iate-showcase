const { connect } = require('../src/components/mongo')
const hash = require('../src/components/hash')

;(async () => {
    const db = await connect()
    await db
        .collection('users')
        .insertMany([
        {
            email: 'ray.charles@gmail.com',
            password: hash('hittheroadjack'),
            role: 'musician'
        },
        {
            email: 'chuck.norris@gmail.com',
            password: hash('roundhouse'),
            role: 'admin'
        },
    ])
})()