const expect = require('expect.js')
const jwt = require('jsonwebtoken')
const sinon = require('sinon')
const mongo = require('../../components/mongo')

const adapter = require('../adapter')

describe('the users adapter', () => {

    describe('when getting users', () => {

        it('should issue the right query to db', async () => {
            const connectStub = sinon.stub(mongo, 'connect')
            const collectionStub = sinon.stub()
            const findOneStub = sinon.stub()

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

})