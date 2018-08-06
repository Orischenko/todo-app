import express from 'express'
import bodyParser from 'body-parser'
import db from './db'
import morgan from 'morgan'
import { todosRouter } from './routes'
import config from './config'
import cors from 'cors'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));
app.use(todosRouter);

db.connect(config.database, function (err) {
    if (err) return console.log(err);

    app.listen(config.port, function () {
        console.log( '--->', 'API was started' );
        console.log( '--->', 'MongoDB was started' );
    })
});