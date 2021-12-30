import axios from 'axios';
import {baseUrl, OTP_DETAILS} from '../helper/constants.helper';
import store from '../store/store';

const auth = {
  getOtp: async data => {
    try {
      console.log('Data', data);
      const otp = await axios.post(`${baseUrl}/auth/otp/init`, data);
      console.log('otp', otp);
      store.dispatch({
        type: OTP_DETAILS,
        payload: otp.data,
      });
      return otp;
    } catch (err) {
      console.log('Error', err);
    }
  },

  login: async (data, otp_id) => {
    //   try{
    //     console.log("Data", data, otp_id);
    //     const otp = await axios.post(`${baseUrl}/auth/otp/${otp_id}/register`, data);
    //     console.log("otp", otp);
    //     // store.dispatch({
    //     //   type: OTP_DETAILS,
    //     //   payload: otp.data
    //     // });
    //     return otp;
    //   } catch(err){
    //     console.log("Error", err.response);
    //     throw Error(err.response);
    //   }
    // }
    const promise = new Promise((resolve, reject) => {
      axios
        .post(`${baseUrl}/auth/otp/${otp_id}/register`, data)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          if (err.response) {
            reject(err.response);
          }
        });
    });
    return promise;
  },
};

export default auth;
