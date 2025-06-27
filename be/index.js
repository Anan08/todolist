const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const routes = require('./routes/index');

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true, // Allow cookies to be sent
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        
    }
));
app.use(express.json());
app.use(cookieParser());

app.use(routes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

