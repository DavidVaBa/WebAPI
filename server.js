var express      = require('express'),
  app            = express(),
  logger         = require('morgan'),
  mongoose       = require('mongoose'),
  bodyParser     = require('body-parser'),
  cors           = require('cors'),
  databaseConfig = require('./config/database'),
  router         = require('./routes');

var connection = mongoose.connect(databaseConfig("local").url);

console.log(mongoose.connection.readyState);

app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

router(app);
