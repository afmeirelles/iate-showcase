const expect = require('expect.js')
const sinon = require('sinon')

const entity = require('../entity')
const adapter = require('../adapter')

describe('the users adapter', () => {

    let getUserStub, generateJWTStub, getAllStub, createStub

    beforeEach(() => {
        getUserStub = sinon.stub(adapter, 'getUserWithCredentials')
        generateJWTStub = sinon.stub(adapter, 'generateJWT')
        getAllStub = sinon.stub(adapter, 'getAll')
        createStub = sinon.stub(adapter, 'create')
    })

    afterEach(() => {
        getUserStub.restore()
        generateJWTStub.restore()
        getAllStub.restore()
        createStub.restore()
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

    describe('when getting a list of all users', () => {

        it('should map the prop _id to id on the results', async () => {
            getAllStub.resolves([
                {
                    _id: 1,
                    name: 'me'
                },
                {
                    _id: '2'
                }
            ])
            expect(await entity.getAll()).to.eql([
                {
                    id: 1,
                    name: 'me'
                },
                {
                    id: '2'
                }
            ])
        })

    })

    describe('when creating a user', () => {

        it('should hash the password and return insertedId', async () => {
            createStub.resolves({
                some: 'data',
                insertedId: 'thenewid'
            })
            expect(await entity.create({ the: 'user', password: '321321' })).to.eql('thenewid')
            expect(createStub.firstCall.args).to.eql([
                {
                    the: 'user',
                    password: '701fd6f18a46f7c72397c91b9cb1a6353744b9cca3aa329af5e5e1124b6b8c5a'
                }
            ])
        })

    })

})