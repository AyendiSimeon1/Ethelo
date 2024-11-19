// server.js
const express = require('express');
const mongoose = require('mongoose');
// require('dotenv').config();
const routes = require('./src/route/index');
const app = express();


app.use(express.json());

app.use(routes);
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});