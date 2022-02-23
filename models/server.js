const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();

        //this.connectDB();

    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // parse application/json
        this.app.use(express.json());

        // habilitar la carpeta public
        // con path.resolve() solucionaoms la cadena de ubicación de la carpeta
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    connectDB() {
        mongoose.connect(process.env.urlBD, (err) => {
            if (err) {
                throw err;
            } else {
                console.log('BBDD ONLINE');
            }
        });
    }

    routes() {
        // Configuración global de rutas
        this.app.use('/', require('../routes/index'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Escuchando en puerto:', this.port);
        });
    }


}

module.exports = Server;




