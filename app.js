const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')


mongoose.connect('mongodb://localhost/test-gigle');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("succesfully connected to db mongoose!");
});

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRouter);
app.use('/user', userRouter)


app.listen(3000,()=>{
  console.log('APP listening on port 3000');
});
