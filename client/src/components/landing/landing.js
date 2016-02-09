import React from 'react';
import { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { Link } from 'react-router';
import SignInModal from '../modals/userSigninModal';
import StreamsUL from '../streamsList/listOfStreams';

let artistButton = {
  'margin-top': "45px",
  'margin-left': "35%",
};

let fanButton = {
  'margin-top': '45px',
  'margin-left': "10%",
};

let windowWidth = window.innerWidth;

if(windowWidth < 1600){
  artistButton['margin-left'] = '29%';
}

export default class Landing extends Component {
  render(){
    return(
      <div>
        <div className="land-wrap">
        <div className="mic-section">


          <div className="left">
          </div>
          <div className="live">
            <h2> <Link to="router/nowStreaming">Currently Streaming</Link> </h2>
            <StreamsUL />
          </div>

          <div className="right">
            <h1> Pick up the mic! </h1>
            <h1>Broadcast your GIGG now! </h1>
            <RaisedButton
              label="Artists"
              secondary={true}
              style={artistButton}
              linkButton={true}
              containerElement={<Link to="/router/artistAuthenticate/signup" >Sign in/Up </Link>}
            />
            <RaisedButton
               label="Fans"
               secondary={true}
               style={fanButton}
               linkButton={true}
               containerElement={<Link to="/router/nowStreaming" className="logoLink"> Now Streaming </Link>}
            />
          </div>
        </div>

      </div>
  </div>
      )
  }
}