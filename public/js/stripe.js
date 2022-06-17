/*eslint-disable*/
//import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51L1cmfGRx5FpZL4gyKa353HImhsjOyyhgK8a0D5JZMyqVquYbXWPqclfUALRTujcza2NOTR5vVP1nHbq2xcYK0IC00vlbEOknY'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    //console.log('SESSION 🚚🚒' + session);

    // 2) Create checkout form + charge credit card
    //console.log(session.data.session.id);
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
