const express = require('express');
const cors = require('cors');
const db = require('./src/models');
const routes = require('./src/routes');
const errorHandler = require('./src/middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api/v1', routes);

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});

module.exports = app;
