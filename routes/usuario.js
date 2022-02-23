const express = require('express');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const { usuariosGet, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const app = express();

app.get('/usuario', verificaToken, usuariosGet);

// CREAR USUARIO
app.post('/usuario', [verificaToken, verificaAdminRole], crearUsuario);

// ACTUALIZAR USUARIO
app.put('/usuario/:id', [verificaToken, verificaAdminRole], actualizarUsuario);

// BORRAR USUARIO
app.delete('/usuario/:id', [verificaToken, verificaAdminRole], borrarUsuario);

module.exports = app;