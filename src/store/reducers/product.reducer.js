import {PRODUCT_LIST} from '../../helper/constants.helper';

const initialState = {
  productList: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST:
      return {...state, productList: action.payload};
    default:
      return state;
  }
};

export default productReducer;
