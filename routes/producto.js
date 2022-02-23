const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();
const Producto = require('../models/producto');

// Obtener productos
app.get('/productos', verificaToken, (req, res) => {
    Producto.find()
        .sort('nombre')
        .populate('categoria', 'usuario categoria')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos, //regresamos productos
            });
        })
});





module.exports = app;