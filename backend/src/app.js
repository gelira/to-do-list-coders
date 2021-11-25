const { join } = require('path');

require('dotenv').config({
  path: join(__dirname, '..', '.env'),
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { 
  PORT = 3000,
  MONGODB_CONNECTION_URI,
} = process.env;

mongoose.connect(MONGODB_CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_, response) => response.json({ ok: true }));

app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`));
