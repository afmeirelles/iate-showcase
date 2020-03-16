# iate-showcase
Showcasing IATE features - repleceable translators and adapters + testability

### Setup MongoDB
1. Download MongoDB image from docker and run it:
    `docker run -d \
    -p 27017-27019:27017-27019 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=root.admin \
    --name mongodb mongo:latest`
2. Open an interactive terminal inside instance: `docker exec -it mongodb bash`
3. Connect to mongo using root auth: `mongo -u admin -p root.admin`
4. Connect to db to be used: `use iate_db`
5. Create your database user:
    `db.createUser({
        user: "iate_server",
        pwd: "iate_server_pass",
        roles: [
            { role: "readWrite", db: "iate_db" }
        ]
    })`
 6. Add some default users to db: `npm run init_db` (after installing dependencies)  


### Config server
1. Open `.env-example`, change env vars values to whatever you need and save as `.env`

### Start server
1. Install dependencies: `npm install`
2. Start server: `npm start`

### Test it
1. Run `npm test` to check unit tests

### Run it
1. Use this Postman collection to run GraphQL queries against the server: https://www.getpostman.com/collections/02f4230a69f0b1cc54d2
