import {combineReducers} from 'redux';

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
});

export default rootReducer;
