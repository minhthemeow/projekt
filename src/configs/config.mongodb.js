'use strict';

//level 0
// const config = {
//     app: {
//         port: 3000
//     },
//     db: {
//         host: 'localhost',
//         port: 27017,
//         name: 'shopDEV',
//     }
// }

//level 1
const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3000
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'shopDEV',
    }
}

const production = {
    app: {
        port: process.env.PRODUCTION_APP_PORT || 3000
    },
    db: {
        host: process.env.PRODUCTION_DB_HOST || 'localhost',
        port: process.env.PRODUCTION_DB_PORT || 27017,
        name: process.env.PRODUCTION_DB_NAME || 'shopPRODUCT',
    }
}

const config = {dev, production};
const env = 'dev' || process.env.NODE_ENV ;

module.exports = config[env];