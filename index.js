require('dotenv').config()
const server = require('./api/server.js');

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOSTNAME || 'http://localhost'

server.listen(PORT, () => {
     console.log(`Listening on port ${HOST}:${PORT}...`);
});
