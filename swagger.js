import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Documentation',
    description: 'This is the API documentation for my application.'
  },
  servers: [
    {
      url: 'https://cse341-personal-project-q24l.onrender.com',
    }
  ] ,
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen()(outputFile, routes, doc);
