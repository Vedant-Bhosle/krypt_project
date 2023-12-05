const express = require('express');
const bodyParser = require('body-parser')
const cors=require('cors')
require('./db/conn')
const port = process.env.PORT || 5001;
const app = express();

var cookieParser = require('cookie-parser')


app.use(cookieParser())
app.use(cors({origin : '*'}));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))



app.use('',require('./routes/auth'));


app.listen(port, () => {
    console.log(`Server is Running on Port ${port}.....`);
});