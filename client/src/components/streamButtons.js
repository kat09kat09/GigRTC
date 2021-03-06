import React from 'react';


const StreamButtons = (props) => {
  return (
    <div className="streamButtons">
      {(props.currentPrivelege && !props.watchMode) ? <button onClick={props.startBroadcast} className="startBroadcast fa fa-youtube-play">Start Stream</button> : ""}
      {props.watchMode ? <button onClick={props.watchVideo} className="joinBroadcast fa fa-eye">Restart Stream!</button> : ""}
      {props.watchMode ? <button onClick={props.endBroadcast} className="joinBroadcast fa fa-eye">Stop Stream!</button> : ""}

        {(props.currentPrivelege && !props.watchMode) ?  <button onClick={props.endBroadcast}className="endBroadcast fa fa-stop-circle">Stop Stream!</button>  : ""}

    </div>
    )
};

export default StreamButtons;
