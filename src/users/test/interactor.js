const expect = require('expect.js')
const sinon = require('sinon')
const errors = require('iate-components').errors

const interactor = require('../interactor')
const entity = require('../entity')

describe('the users adapter', () => {

    let getUserStub, generateJWTStub

    beforeEach(() => {
        getUserStub = sinon.stub(entity, 'getUserWithCredentials')
        generateJWTStub = sinon.stub(entity, 'generateJWT')
    })

    afterEach(() => {
        getUserStub.restore()
        generateJWTStub.restore()
    })

    describe('when logging users in', () => {

        it('should query for users by credentials and throw if user cannot be found', async () => {
            getUserStub.resolves(null)
            try {
                await interactor.login({ user: 'chuck', pass: 'norris' })
            } catch (error) {
                expect(error).to.be.a(errors.UNAUTHORIZED)
            }
        })

        it('should generate and return a jwt', async () => {
            getUserStub.resolves({ some: 'user' })
            generateJWTStub.returns('thetoken')
            expect(await interactor.login({ user: 'chuck', pass: 'norris' })).to.be('thetoken')
        })

    })

})