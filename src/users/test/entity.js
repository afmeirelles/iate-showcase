const expect = require('expect.js')
const sinon = require('sinon')

const entity = require('../entity')
const adapter = require('../adapter')

describe('the users adapter', () => {

    let getUserStub, generateJWTStub

    beforeEach(() => {
        getUserStub = sinon.stub(adapter, 'getUserWithCredentials')
        generateJWTStub = sinon.stub(adapter, 'generateJWT')
    })

    afterEach(() => {
        getUserStub.restore()
        generateJWTStub.restore()
    })

    describe('when getting users by credentials', () => {

        it('should hash the password before querying', async () => {
            await entity.getUserWithCredentials({ email: 'chuck', password: 'norris' })
            expect(getUserStub.firstCall.args[0]).to.eql({
                email: 'chuck',
                // hashed password
                password: '11d6fe94df911d49e71b6c4aae7b9d4a397662a3c1767cf578b785ed35372ec7'
            })
        })

    })

    describe('when generating a jwt', () => {

        it('should replace the _id prop for client_id', () => {
            entity.generateJWT({
                _id: 'id',
                email: 'email',
                role: 'role'
            })
            expect(generateJWTStub.firstCall.args).to.eql([{
                client_id: 'id',
                email: 'email',
                role: 'role'
            }])
        })

    })

})