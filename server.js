import express from 'express';
import cors from 'cors';
import databaseConnection from './models/index.js';
import routes from './routes/index.js';

const app = express();
const port = process.env.PORT || 8080;

app
  .use(cors())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', routes);

const db = databaseConnection;
db.mongoose
  .connect(db.url, {})
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('Could not connect to the DB!', err);
    process.exit();
  });
