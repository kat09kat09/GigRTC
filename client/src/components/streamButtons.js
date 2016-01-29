import React from 'react';

const StreamButtons = () => {
  return (
    <div className="streamButtons">
      <button className="startBroadcast fa fa-youtube-play">Start Stream</button>
      <button className="joinBroadcast fa fa-eye">Watch Stream!</button>
      <button className="endBroadcast fa fa-stop-circle">Stop Stream!</button>
    </div>
    )
};

export default StreamButtons;
