
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const configPath = path.join(__dirname, 'config.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Obtener configuración actual
app.get('/config', (req, res) => {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  res.json(config);
});

// Guardar configuración nueva
app.post('/update', (req, res) => {
  const nuevoConfig = {
    activo: req.body.activo === 'on',
    frecuenciaMinutos: parseInt(req.body.frecuenciaMinutos) || 10,
  };
  fs.writeFileSync(configPath, JSON.stringify(nuevoConfig, null, 2));
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Panel del bot escuchando en http://localhost:3000');
});
