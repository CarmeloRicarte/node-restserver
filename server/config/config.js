// ==============
//     Puerto
// ==============
process.env.PORT = process.env.PORT || 3000;

// ==============
//     Entorno
// ==============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==============
// Base de datos
// ==============
let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = process.env.MONGO_URI;
}
process.env.urlBD = urlBD;

// ======================
// Vencimiento del token
// ======================
// "30 days"
process.env.CADUCIDAD_TOKEN = "30 days";

// ======================
// SEED de autenticación
// ======================
process.env.SEED = process.env.SEED || 'seed-desarrollo'