const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { auth } = require('./middlewares/authMiddleware');

const PORT = 3000;
const app = express();

app.use(cookieParser());
app.use(cors({
    origin: config.origin,
    credentials: true
}));

app.use(express.json());

app.use(routes)

mongoose.connect('mongodb://localhost:27017/dentalconnect')
    .then(() => {
        console.log('DB is connected!');
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    })
    .catch(() => console.log('Cannot connect DB!'));