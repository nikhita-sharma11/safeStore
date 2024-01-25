import {combineReducers} from 'redux';
import cartReducer from './cartReducer';

const selectedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_PRODUCT':
      return action.payload;
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  selectedProduct: selectedProductReducer,
  cart: cartReducer,
});

export default rootReducer;
