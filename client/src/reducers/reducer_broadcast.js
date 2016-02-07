import {createReducer} from '../utils';
import CONSTANT from '../constants/index';
const {SAVE_BROADCAST} = CONSTANT;

const initialState = {
  data: []
};

export default function (state=initialState, action) {
  switch (action.type){
    case SAVE_BROADCAST:
      return state.data.concat([action.payload.data]);
  }
  return state;
}
