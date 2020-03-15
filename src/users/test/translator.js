const expect = require('expect.js')
const sinon = require('sinon')

const responseMock = require('../../components/responseMock')
const translator = require('../translator')
const interactor = require('../interactor')

describe('the users translator', () => {

    let res

    beforeEach(() => {
        res = responseMock()
    })

    describe('when logging in users', () => {

        let loginStub
        const body = {
            email: 'email',
            password: 'password'
        }

        beforeEach(() => {
            loginStub = sinon.stub(interactor, 'login')
        })

        afterEach(() => {
            loginStub.restore()
        })

        it('should return a 422 HTTP error if any required field is missing', async () => {
            await translator.login({ body: {} }, res)
            expect(res.status.firstCall.args).to.eql([ 422 ])
            expect(res.json.firstCall.args).to.eql([
                {
                    message: "data should have required property '.email'",
                    info: {
                        missingProperty: '.email'
                    }
                }
            ])
        })

        it('should return a 500 HTTP error login fails for some reason', async () => {
            loginStub.throws(new Error('something failed'))
            await translator.login({ body }, res)
            expect(res.status.firstCall.args).to.eql([ 500 ])
            expect(res.json.firstCall.args).to.eql([ { message: 'something failed', info: undefined }])
        })

        it('return the jwt if login was successful', async () => {
            loginStub.resolves('jwt_here')
            await translator.login({ body }, res)
            expect(res.json.firstCall.args).to.eql([ { token: 'jwt_here' }])
        })

    })

})