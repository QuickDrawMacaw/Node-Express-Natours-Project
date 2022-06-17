/*eslint-disable*/

import { showAlert } from './alerts';

//type is either 'password' or 'data'
export const updateTour = async (name, price, duration) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `api/v1/tours/${data.id}`,
      name,
      price,
      duration,
    });

    if (res.data.status === 'success') {
      showAlert('success', `Tour updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
//      url: `api/v1/tours/${data.id}`,
