import React from 'react';


const StreamButtons = (props) => {
  return (
    <div className="streamButtons">
      {props.isBroadcaster ? <button onClick={props.startBroadcast} className="startBroadcast fa fa-youtube-play">Start Stream</button> : ""}
      {!props.isBroadcaster ? <button className="joinBroadcast fa fa-eye">Watch Stream!</button> : ""}
      <button onClick={props.endBroadcast}className="endBroadcast fa fa-stop-circle">Stop Stream!</button>

    </div>
    )
};

export default StreamButtons;
