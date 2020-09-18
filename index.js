import express from 'express';
import mongoose from 'mongoose';
import route from './routes/index.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));



app.use('/', route);

mongoose.connect('mongodb://localhost/fastracking')
    .then(()=> console.log('Connected to mongodb.....'))
    .catch(err => console.log('Could not connect to mongodb....', err.message))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));