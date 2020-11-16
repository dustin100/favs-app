const express = require('express');
const connectDB = require('../config/db');

const app = express();
connectDB();
// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
