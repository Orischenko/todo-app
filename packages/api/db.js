const MongoClient = require ('mongodb').MongoClient;

const state = {
    db: null
};

exports.connect = function (url, done) {
    if (state.db) return done();

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, database) {
        if (err) return done(err);

        state.db = database.db('todo_db');

        done();
    });
};

exports.get = function () {
    return state.db
};