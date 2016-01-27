import {SAVE_BROADCAST} from '../actions/index';

export default function (state=[], action) {
  switch (action.type){
    case SAVE_BROADCAST:
      return state.concat([action.payload.data]); 
  }
  return state; 
}