const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const csp = require('express-csp');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//1. Global MiddleWares

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Set security HTTP headers
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(helmet());

csp.extend(app, {
  policy: {
    directives: {
      'default-src': ['self'],
      'style-src': ['self', 'unsafe-inline', 'https:'],
      'font-src': ['self', 'https://fonts.gstatic.com'],
      'script-src': [
        'self',
        'unsafe-inline',
        'data',
        'blob',
        'https://js.stripe.com',
        'https://*.mapbox.com',
        'https://*.cloudflare.com/',
        'https://bundle.js:8828',
        'http://localhost:*/',
        'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js',
        'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css',
      ],
      'worker-src': [
        'self',
        'unsafe-inline',
        'data:',
        'blob:',
        'https://*.stripe.com',
        'https://*.mapbox.com',
        'https://*.cloudflare.com/',
        'https://bundle.js:*',
        'http://localhost:*/',
        'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js',
        'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css',
      ],
      'frame-src': [
        'self',
        'unsafe-inline',
        'data:',
        'blob:',
        'https://*.stripe.com',
        'https://*.mapbox.com',
        'https://*.cloudflare.com/',
        'https://bundle.js:*',
        'http://localhost:*/',
        'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js',
        'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css',
      ],
      'img-src': [
        'self',
        'unsafe-inline',
        'data:',
        'blob:',
        'https://*.stripe.com',
        'https://*.mapbox.com',
        'https://*.cloudflare.com/',
        'https://bundle.js:*',
        'http://localhost:*/',
        'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js',
        'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css',
      ],
      'connect-src': [
        'self',
        'unsafe-inline',
        'data:',
        'blob:',
        // 'wss://<HEROKU-SUBDOMAIN>.herokuapp.com:<PORT>/',
        'https://*.stripe.com',
        'https://*.mapbox.com',
        'https://*.cloudflare.com/',
        'https://bundle.js:*',
        'http://localhost:*/',
        'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js',
        'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css',
      ],
    },
  },
});

//Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

console.log(process.env.NODE_ENV);

//Limit requests from same API
const limiter = rateLimit({
  max: 100, //100 attempts
  windowMs: 60 * 60 * 1000, //milliseconds
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

//Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' })); //using middleware
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//Data sanitization NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.cookies);
  next();
});

//2. Routes

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on the server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
