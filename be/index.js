const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const routes = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(routes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

