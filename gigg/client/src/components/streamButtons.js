import React from 'react';

const StreamButtons = () => {
  return (
    <div className="streamButtons right">
      <button className="startBroadcast glyphicon glyphicon-facetime-video">Start Broadcast</button>
      <button className="joinBroadcast glyphicon glyphicon-music">Watch the Stream!</button>
      <button className="endBroadcast warning glyphicon glyphicon-stop">Stop the Stream!</button>
    </div>
    )
};

export default StreamButtons;