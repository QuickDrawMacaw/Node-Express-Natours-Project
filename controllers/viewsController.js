const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including the reviews and the guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  // 2) Build the template

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 3) Render template using data from 1

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = (req, res, next) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';"
    )
    .render('login', {
      title: 'Login',
    });
};

exports.getSignUpForm = (req, res, next) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';"
    )
    .render('signup', {
      title: 'SignUp',
    });
};

exports.getManageToursForm = catchAsync(async (req, res, next) => {
  const tours = await Tour.find(); // retrieve the tour data from the db
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';"
    )
    .render('manageTours', {
      title: 'Manage Tours',
      tours,
    });
});

exports.getEditTourForm = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }); //use findOne instead of find - find returns undefined when tour.name is called
  console.log(tour);

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';"
    )
    .render('editTour', {
      title: 'Edit Tour',
      tour,
    });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

// exports.updateTourData = catchAsync(async (req, res, next) => {
//   console.log('Updating Tour');
//   // const updatedTour = await Tour.findByIdAndUpdate(
//   //   req.tour.id,
//   //   {
//   //     name: req.body.name,
//   //     price: req.body.price,
//   //     duration: req.body.duration,
//   //   },
//   //   {
//   //     new: true,
//   //     runValidators: true,
//   //   }
//   // );
//   console.log('🎏🎎🎍🎍' + updatedTour);
//   //Tour.updateOne(updatedTour);
//   // updateTour(updatedTour);
//   // res.status(200).json({
//   //   status: 'success',
//   //   message: 'The tour has been updated',
//   // });
// });

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
