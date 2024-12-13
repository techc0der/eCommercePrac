const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const homePage = require('./Routes/home');
const user = require('./Routes/user');
require('./db_connect');

app.use(express.json());
app.use(cors());
app.use('/product',homePage);
app.use('/user',user);
const PORT = process.env.PORT  || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});       