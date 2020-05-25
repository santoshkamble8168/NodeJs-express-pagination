const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit:512000, type: 'application/json'}));

//connect to database
const mongooseUrl = `mongodb://localhost:27017/paginationDB`;

mongoose.connect(
    mongooseUrl,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('Database is connected')
)

//router
const userRoute = require('./routes/users');

//router middleware
app.use('/api/user', userRoute);

const port = 3001;
app.listen(port, ()=> console.log('Server is running on Port: '+ port)); 