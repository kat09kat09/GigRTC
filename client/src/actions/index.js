import axios from 'axios';


export const SAVE_BROADCAST= 'SAVE_BROADCAST'; 


//placeholder for post to /api/saveBroadcast endpoint
export function saveBroadcast(broadcastData) {
  axios.post('api/saveBroadcast', broadcastData);

  return {
    type: SAVE_BROADCAST,
    payload: broadcastData
  }

}