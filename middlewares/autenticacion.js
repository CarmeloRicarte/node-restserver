const jwt = require('jsonwebtoken');

/*
 * Verificar token
*/

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    // comparamos el token que enviamos con el que hay almacenado

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        // si son iguales, el usuario de la petición es igual
        // al que hay almacenado en el token
        req.usuario = decoded.usuario;
        next(); // con esto sigue la aplicación
    });
};

/*
 * Verifica AdminRole
*/

let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }


}

module.exports = {
    verificaToken,
    verificaAdminRole
};