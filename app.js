const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const poemRoutes = require('./routes/poem');

// app
const app = express();
app.get('/', (req, res) => {
    res.send("What tha fuck are you still tryna see here!!!");
});

// db
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB Connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', poemRoutes);

const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
