const express = require('express');
const _ = require('underscore');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();
const Categoria = require('../models/categoria');


// Mostrar todas las categorías
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('nombre') // ordenamos por el nombre de la categoria//

        // cargamos de la colección usuario, el nombre y el email de quien
        // ha creado la categoría
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categorias, //regresamos categorías
            });
        });
});

// Mostrar una categoría por ID
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (error, categoria) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if (!categoria) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoría no encontrada'
                }
            });
        }
        res.json({
            ok: true,
            categoria
        });
    })
});

// Crear nueva categoria
app.post('/categoria', verificaToken, (req, res) => {
    // regresa la nueva categoria
    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBD
        });
    });
});

// Actualizar el nombre de la categoria
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    // con la fn pick de Underscore, indicamos qué argumentos sí se pueden actualizar
    let body = _.pick(req.body, ['nombre']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBD
        });
    });

});

app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    // solo un ADMIN_ROLE puede borrar categorías
    Categoria.findByIdAndRemove(id, (error, categoriaBorrada) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoría no encontrada'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Categoria eliminada'
        });
    });
});

module.exports = app;

