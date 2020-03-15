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
4. Create your database user:
    `db.createUser({
        user: "iate_server",
        pwd: "iate_server_pass",
        roles: [
            { role: "readWrite", db: "iate_db" }
        ]
    })`


### Config server
1. Open `.env-example`, change env vars values to whatever you need and save as `.env`

### Start server
1. Install dependencies: `npm install`
2. Start server: `npm start`