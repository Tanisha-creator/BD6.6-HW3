const express = require('express');
const { getBooks, getBookById } = require('./controllers');

const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.json());

// Exercise 1: Retrieve All Books

app.get('/books', (req, res) => {
  let result = getBooks();
  if (result.length === 0) {
    return res.status(404).json({ error: 'Data not found!' });
  }
  res.json(result);
});

// Exercise 2: Retrieve Book by ID

app.get('/books/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let result = getBookById(id);
  if (result.length === 0) {
    return res.status(404).json({ error: 'Data not found!' });
  }
  res.json(result);
});

module.exports = { app };
