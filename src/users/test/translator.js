const expect = require('expect.js')
const sinon = require('sinon')

const translator = require('../translator')
const interactor = require('../interactor')

describe('the users translator', () => {
    
    let loginStub, getByIdStub, getAllStub, createStub

    beforeEach(() => {
        loginStub = sinon.stub(interactor, 'login')
        getByIdStub = sinon.stub(interactor, 'getById')
        getAllStub = sinon.stub(interactor, 'getAll')
        createStub = sinon.stub(interactor, 'create')
    })

    afterEach(() => {
        loginStub.restore()
        getByIdStub.restore()
        getAllStub.restore()
        createStub.restore()
    })

    describe('when logging in users', () => {

        const credentials = {
            email: 'email',
            password: 'password'
        }

        it('should throw an error if login fails for some reason', async () => {
            loginStub.throws(new Error('something failed'))
            try {
                await translator.login(credentials)
            } catch (error) {
                expect(error).to.be.an(Error)
                expect(error.message).to.eql('something failed')
            }
        })

        it('return the jwt if login was successful', async () => {
            loginStub.resolves('jwt_here')
            expect(await translator.login(credentials)).to.eql('jwt_here')
            expect(loginStub.firstCall.args).to.eql([ credentials ])
        })

    })

    describe('when getting user by id', () => {

        it('should throw an error if login fails for some reason', async () => {
            getByIdStub.throws(new Error('something failed'))
            try {
                await translator.getById('id')
            } catch (error) {
                expect(error).to.be.an(Error)
                expect(error.message).to.eql('something failed')
            }
        })

        it('return the user if found', async () => {
            getByIdStub.resolves({ the: 'user' })
            expect(await translator.getById({ id: 'id' })).to.eql({ the: 'user' })
            expect(getByIdStub.firstCall.args).to.eql([ 'id' ])
        })

    })

    describe('when getting a user list', () => {

        it('should throw an error if login fails for some reason', async () => {
            getAllStub.throws(new Error('something failed'))
            try {
                await translator.getAll()
            } catch (error) {
                expect(error).to.be.an(Error)
                expect(error.message).to.eql('something failed')
            }
        })

        it('return the user if found', async () => {
            getAllStub.resolves([ { the: 'user' } ])
            expect(await translator.getAll()).to.eql([ { the: 'user' } ])
            expect(getAllStub.calledOnce).to.be.ok()
        })

    })

    describe('when creating a user', () => {

        it('should throw an error if login fails for some reason', async () => {
            createStub.throws(new Error('something failed'))
            try {
                await translator.create({ the: 'user' })
            } catch (error) {
                expect(error).to.be.an(Error)
                expect(error.message).to.eql('something failed')
            }
        })

        it('return the user if found', async () => {
            const user = {
                email: 'email',
                password: 'password',
                role: 'role',
            }
            createStub.resolves('thenewid')
            expect(await translator.create(user)).to.eql('thenewid')
            expect(createStub.firstCall.args).to.be.eql([ user ])
        })

    })

})