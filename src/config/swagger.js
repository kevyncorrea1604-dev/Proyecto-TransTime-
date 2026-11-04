
const swaggerJsdoc = require('swagger-jsdoc');

const opciones = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API TRANSTIME',
            version: '1.0.0',
            description: 'API REST para gestionar el sistema de transporte TRANSTIME'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            }
        ],
        tags: [
            {
                name: 'Busetas',
                description: 'Operaciones de gestión de busetas'
            },
                        {
                name: 'Rutas',
                description: 'Operaciones de gestión de rutas'
            },

            {
                name: 'Recorridos',
                description: 'Operaciones de gestion de recorridos'
            },
        ]
    },
    apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(opciones);
