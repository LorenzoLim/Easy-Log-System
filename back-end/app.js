const path = require('path');
const logger = require('morgan');
const express = require('express');
const port = process.env.PORT || 7000;
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { mongoose, db } = require('./database');
const { initialize, requireJWT, verifyAdmin } = require('./middleware/auth')
const cors = require('cors');

const index = require('./routes/index');
const users = require('./routes/users');
const projects = require('./routes/projects');
const hours = require('./routes/hours');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json())
app.use(cors());

app.get('/admin', requireJWT, verifyAdmin, (req, res) => {
  res.send('Hello Admin!')
})

// Routes
app.use([
  require('./routes/auth')
])

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/projects', projects);
app.use('/hours', hours);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, (error) => {
  if (error) {
    console.log('There was a problem starting the server', error)
  } else {
    console.log(`Server is listening on port: ${port} `)
  }
})

module.exports = app;
