import React from 'react';

const StreamButtons = (props) => {
  return (
    <div className="streamButtons">
      <button className="startBroadcast fa fa-youtube-play">Start Stream</button>
      <button className="joinBroadcast fa fa-eye">Watch Stream!</button>
      <button className="endBroadcast fa fa-stop-circle">Stop Stream!</button>
        <a href="auth/facebook/"> Facebook </a>

    </div>
    )
};

export default StreamButtons;
