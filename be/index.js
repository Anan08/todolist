const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const path = require('path');
const port = process.env.PORT;
const routes = require('./routes/index');


app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true, // Allow cookies to be sent
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        
    }
));
app.use(express.json({limit : '10mb'}));
app.use(cookieParser());

app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

