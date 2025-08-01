const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
 
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DSA Rankboard API',
            version: '1.0.0',
            description: 'API documentation for the DSA Rankboard project.',
        },
        servers: [
            {
url: 'http://localhost:5001',
                description: 'Development server',
            },
        ],
    },
    // Path to the API docs
    apis: ['./server/routes/*.js'],
};
 
const swaggerSpec = swaggerJsdoc(options);
 
const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('✅ Swagger docs available at /api-docs');
};
 
module.exports = swaggerDocs;