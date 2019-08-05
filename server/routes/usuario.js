const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', function (req, res) {

    let desde = req.query.desde || 0; // lo indicamos como parámetro en la petición
    desde = Number(desde);

    let porPagina = req.query.porPagina || 5;
    porPagina = Number(porPagina);

    Usuario.find({ estado: true }, 'nombre email role estado google img') // todos los registros
        .skip(desde) // para indicar desde qué registro empieza a mostrar
        .limit(porPagina) // cuantos muestra
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios, //regresamos usuarios
                    usuariosActivos: conteo
                });
            })
        })
});

// CREAR USUARIO
app.post('/usuario', function (req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

// ACTUALIZAR USUARIO
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    // con la fn pick de Underscore, indicamos qué argumentos sí se pueden actualizar
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', function (req, res) {

    let id = req.params.id;

    // Para eliminar el registro:
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {  

    //Cambiamos el estado a FALSE
    Usuario.findByIdAndUpdate(id, { estado: 'false' }, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    })
});

module.exports = app;