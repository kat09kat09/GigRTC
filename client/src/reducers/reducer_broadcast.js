import CONSTANT from '../constants/index';
const {SAVE_BROADCAST} = CONSTANT;

export default function (state=[], action) {
  switch (action.type){
    case SAVE_BROADCAST:
      return state.concat([action.payload.data]);
  }
  return state;
}
