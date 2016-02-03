import { ADD_MESSAGE, RECEIVE_MESSAGE, LOAD_MESSAGES, LOAD_MESSAGES_SUCCESS, LOAD_MESSAGES_FAIL, AUTH_SIGNOUT_SUCCESS} from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  data: [],
  fetchHistory: []
};
export default function messages(state = initialState, action) {
  console.log('action', action); 
  console.log('action.channel', action.channel)
  switch (action.type) {
  case ADD_MESSAGE:
    return {...state,
      data: [...state.data, action.message]
    };
  case RECEIVE_MESSAGE:
    return {...state,
      data: [...state.data, action.message]
    };
  case LOAD_MESSAGES:
    return {...state,
      loading: true
    };
  case LOAD_MESSAGES_SUCCESS:
    console.log('LOAD_MESSAGES_SUCCESS reducer called'); 
    return {...state,
      loading: false,
      loaded: true,
      fetchHistory: [...state.fetchHistory, { lastFetch: action.date, channelName: action.channel }],
      data: [...state.data.filter(message => message.channelID !== action.channel), ...action.json.data]
    };
  case LOAD_MESSAGES_FAIL:
    return {...state,
      loading: false,
      loaded: false,
      error: action.error,
      data: [...state.data]
    };
  case AUTH_SIGNOUT_SUCCESS:
    return {
      loaded: false,
      data: [],
      fetchHistory: []
    };
  default:
    return state;
  }
}
