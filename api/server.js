const express = require('express');
const connectDB = require('../config/db');
const cookieParser = require('cookie-parser');

const app = express();
connectDB();

// Init Middleware alternative to bodyParser.json()
app.use(express.json({ extended: false }));

// added to setup cookies
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/user', require('./routes/user'));
// app.use('/auth', require('./routes/auth'));
// app.use('/profile', require('./routes/profile'));
app.use('/category', require('./routes/category'));
app.use('/item', require('./routes/item'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
