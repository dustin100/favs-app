const express = require('express');
const connectDB = require('../config/db');

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
