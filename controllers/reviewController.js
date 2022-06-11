const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
//const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');

exports.setTourUserIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

exports.checkUser = (req, res, next) => {
  //if the logged/current user does not have a booking for the tour send, a response: cannot write review because you do not have a booking

  console.log('🤡 tourID: ' + req.params.tourId);
  console.log('😎 tourName:' + req.params.tourName);
  console.log('😛 tourDate: ' + req.params.tourDate);

  console.log('🎃 Review: ' + req.body.review);
  console.log('🧨 Rating:' + req.body.rating);
  console.log('🎭 User: ' + req.body.user);
  console.log('🍟 Booking: ' + req.body.booking);

  //const booking = await Booking.find({user: req.body.user, booking: req.body.booking})
  //if (booking.length === 0) return next(new AppError('You must buy this tour to review it', 401));
  next();

  // req.params.id = req.user.id;
  // console.log('USER ID 🛹🦽🚒🚒 ' + req.user.id);
  // if (!req.user.id === req.booking.user)
  //   return next(new AppError('You do not have a booking for the tour', 403));

  //if the tour date has not passed, respond: You cannot review a tour that has not finished
  // if (Date.now() < req)
  //   return next(
  //     new AppError('You cannot review a tour that is not finished', 403)
  //   );
  next();
};
