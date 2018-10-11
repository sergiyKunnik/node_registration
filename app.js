const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.router');
const testRouter = require('./routes/test.router');

mongoose.connect(
    'mongodb://localhost/register_tutorial',
    {
        useCreateIndex: true,
        useNewUrlParser: true
    }, () =>{
        console.log('Connect to MongoDb...');
    }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/user', userRouter);
app.use('/test', testRouter);

// CONFIG URL

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message
        }
    })
})
// END CONFIG URL
module.exports = app;