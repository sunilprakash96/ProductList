import {OTP_DETAILS} from '../../helper/constants.helper';

const initialState = {
  otpDetails: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case OTP_DETAILS:
      return {...state, otpDetails: action.payload};
    default:
      return state;
  }
};

export default authReducer;
