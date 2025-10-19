import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Documentation',
    description: 'This is the API documentation for my application.'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen()(outputFile, routes, doc);
