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
    urlBD = 'mongodb+srv://Aytekin:6psf4eVmQf6x92ox@cluster0-pfqij.mongodb.net/cafe';
}
process.env.urlBD = urlBD;


