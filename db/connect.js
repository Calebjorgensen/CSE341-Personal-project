const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let _db;

//Initialize the database connection
const initDb = (callback) => {
    if (_db) {
        console.log('DB is already initialized!');
        return callback(null, _db);
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client.db();
            console.log('Database connected successfully');
            callback(null, _db);
        })
        .catch((err) => {
            console.error('Error connecting to MOngoDB:', err);
            callback(err);
        });
};

//Get the database instance 
const getDb = () => {
    if (!_db) {
        throw new Error('Database not initialzed');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb
};