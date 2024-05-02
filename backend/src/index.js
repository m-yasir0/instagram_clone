// Imports and packages

const app = require('express')();
require('dotenv').config();
const { PORT } = require('./utilities/appConstants');
var db = require('./models');
const MainRouter = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const i18next = require('i18next');
const backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

// End imports

// Apply necessary middlewares
i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    preload: ['en'],
    fallbackLng: 'en',
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
    },
  });

app.use(middleware.handle(i18next));
app.use(
  cors({
    origin: '*',
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use index router
app.use(MainRouter);

// sync and start sequilize server
db.sequelize.sync({ alter: true }).then(() => {
  console.log('Connected to db');
  app.listen(PORT, () => {
    console.log(`started listening to port ${PORT}`);
  });
});

// Error function handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  const status = err.statusCode || err.status || 500;
  res.locals.status = status;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(status).json({
    error: {
      statusCode: status,
      messages: Array.isArray(err.message)
        ? err.message.map((val) => req.t(val))
        : req.t(err.message),
    },
  });
});
