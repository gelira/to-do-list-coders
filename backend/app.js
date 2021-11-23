require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { 
  PORT = 3000, 
} = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_, response) => response.json({ ok: true }));

app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`));
