const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);

router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', viewsController.getSignUpForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);

router.get(
  '/manage-tours',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getManageToursForm
);

router.get(
  '/manage-tours/:slug',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getEditTourForm
);

// router
//   .route('/manage-tours/:slug')
//   .patch(
//     authController.isLoggedIn,
//     authController.protect,
//     authController.restrictTo('admin'),
//     viewsController.updateTourData
//   );

router.get('/manage-users', authController.restrictTo('admin'));
router.get('/manage-reviews', authController.restrictTo('admin'));
router.get('/manage-bookings', authController.restrictTo('admin'));

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
