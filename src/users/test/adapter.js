const expect = require('expect.js')
const jwt = require('jsonwebtoken')
const sinon = require('sinon')
const mongo = require('../../components/mongo')

const adapter = require('../adapter')

describe('the users adapter', () => {

    let connectStub, objectIdStub, collectionStub, findOneStub

    beforeEach(() => {
        connectStub = sinon.stub(mongo, 'connect')
        objectIdStub = sinon.stub(mongo, 'ObjectId')
        collectionStub = sinon.stub()
        findOneStub = sinon.stub()
    })

    afterEach(() => {
        connectStub.restore()
        objectIdStub.restore()
    })

    describe('when getting users', () => {

        it('should issue the right query to db', async () => {
            const email = 'the@email'
            const password = 'somepass'

            findOneStub.withArgs({ email, password }).resolves('found 1 guy!')
            collectionStub.withArgs('users').returns({ findOne: findOneStub })
            connectStub.returns({ collection: collectionStub })

            const user = await adapter.getUserWithCredentials({ email, password })
            
            expect(connectStub.calledOnce).to.be.ok()
            expect(collectionStub.calledOnce).to.be.ok()
            expect(findOneStub.calledOnce).to.be.ok()
            expect(user).to.eql('found 1 guy!')

        })

    })

    describe('when generating a jwt', () => {

        it('should include data into it', () => {
            const token = adapter.generateJWT({ some: 'random data'})
            const decoded = jwt.decode(token)
            expect(decoded.some).to.be('random data')
            expect(decoded).to.have.property('iat')
            expect(decoded).to.have.property('exp')
        })

    })

    describe('when finding by id', () => {

        it('should issue the right query to db', async () => {
            objectIdStub.returns('the id')

            findOneStub.withArgs('the id').resolves('here is your guy')
            collectionStub.withArgs('users').returns({ findOne: findOneStub })
            connectStub.returns({ collection: collectionStub })

            const user = await adapter.getById('id')
            
            expect(connectStub.calledOnce).to.be.ok()
            expect(collectionStub.calledOnce).to.be.ok()
            expect(findOneStub.calledOnce).to.be.ok()
            expect(user).to.eql('here is your guy')
            expect(objectIdStub.firstCall.args).to.eql([ 'id' ])

        })

    })

    describe('when finding all', () => {

        it('should issue the right query to db', async () => {
            const findStub = sinon.stub()
            const toArrayStub = sinon.stub()

            toArrayStub.resolves([ 'some guys and girls' ])
            findStub.returns({ toArray: toArrayStub })
            collectionStub.withArgs('users').returns({ find: findStub })
            connectStub.returns({ collection: collectionStub })

            const list = await adapter.getAll()
            
            expect(connectStub.calledOnce).to.be.ok()
            expect(collectionStub.calledOnce).to.be.ok()
            expect(findStub.calledOnce).to.be.ok()
            expect(toArrayStub.calledOnce).to.be.ok()
            expect(list).to.eql(['some guys and girls'])

        })

    })

    describe('when creating a user', () => {

        it('should issue the right query to db', async () => {
            const insertOneStub = sinon.stub()
            insertOneStub.resolves({ insertedId: 'id' })

            collectionStub.returns({ insertOne: insertOneStub })
            connectStub.returns({ collection: collectionStub })

            const result = await adapter.create({ the: 'user' })
            
            expect(connectStub.calledOnce).to.be.ok()
            expect(insertOneStub.calledOnce).to.be.ok()
            expect(insertOneStub.firstCall.args).to.eql([ { the: 'user' }])
            expect(result).to.eql({ insertedId: 'id' })

        })

    })

})