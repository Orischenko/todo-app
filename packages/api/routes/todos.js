import express from "express";
import db from "../db";
import { ObjectID } from 'mongodb'

const app = express();

app.get('/', function(req, res) {
    res.send( 'Hello todo API' );
});

app.get('/todos', function(req, res) {
    let query = {};
    const category = req.query.category;

    if (category) {
        query = { category: req.query.category }
    }

    db.get().collection('notes').find(query).sort({completed: 1, date: -1}).toArray(function(err, data) {
        if (err) return res.sendStatus(500);

        res.send(data);
    })
});

app.post('/todos', function(req, res) {
    const body = req.body;

    if (body.error) {
        console.log( body.error );
        res.send(400, body.error);
        return;
    }

    db.get().collection('notes').insertOne(body,
        function (err, result) {
            if (err) {
                console.log( `DB error ${err}` );
                return res.sendStatus(500);
            }

            res.send(result);
        });
});

app.put('/todos', function(req, res) {
    db.get().collection('notes').findOneAndUpdate(
        { '_id': ObjectID(req.body._id) },
        {
            $set: {
                completed: req.body.completed
            }
        },
        { upsert: true },

        function (err, result) {
            if (err) {
                console.log( `DB error ${err}` );
                return res.sendStatus(500);
            }

            res.send(result);
        }
    )
});

app.delete('/todos/:id', function(req, res) {
    db.get().collection('notes').deleteOne(
        { '_id': ObjectID(req.params.id) },

        function (err, result) {
            if (err) {
                console.log( `DB error ${err}` );
                return res.sendStatus(500);
            }

            res.send(result);
        }
    );
});

export default app;