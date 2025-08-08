const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const config = require('./config/index');



const app = express();
//middleware
app.use(express.json());
app.use(cors());
connectDB();


app.listen (config.port , ()=>{
    console.log ('App is running on port' , config.port);
})