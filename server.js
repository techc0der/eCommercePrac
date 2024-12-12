const express = require('express');
const app = express();
require('dotenv').config();
const homePage = require('./Routes/home');
require('./db_connect');

app.use(express.json());

app.use('/product',homePage);
const PORT = process.env.PORT  || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});       