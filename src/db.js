const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const { dbUri, localdbUri } = require("./config");

let dbConnection;
// const client = new MongoClient(dbUri, { useNewUrlParser: true });

module.exports = {
    connectToDb: cb => {
        MongoClient.connect(dbUri, { useNewUrlParser: true })
            .then(client => {
                dbConnection = client.db();
                return cb();
            })
            .catch(error => {
                console.log(error);
                return cb(error);
            });
    },
    getDb: () => dbConnection,
};
