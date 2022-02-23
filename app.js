if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const Server = require('./models/server');

const server = new Server();
server.listen();