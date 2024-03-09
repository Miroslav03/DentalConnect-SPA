const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
//app.use();//auth


mongoose.connect('mongodb://localhost:27017/dentalconnect')
    .then(() => {
        console.log('DB is connected!');
        app.listen(PORT, () => console.log('Server is listening on port 3030...'));
    })
    .catch(() => console.log('Cannot connect DB!'));