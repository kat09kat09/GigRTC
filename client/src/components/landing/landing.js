import React from 'react';
import { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

const artistButton = {
  'margin-top': "45px",
  'margin-left': "35%",
};

const fanButton = {
  'margin-top': '45px',
  'margin-left': "10%",
};

export default class Landing extends Component {
  render(){
    return(
      <div>
        <div className="land-wrap">
        <div className="mic-section">
        
        
          <div className="left">
          </div>

          <div className="right">
            <h1> Pick up the mic! </h1> 
            <h1>Broadcast your GIGG now! </h1>
            <RaisedButton label="Artists" secondary={true} style={artistButton} />
            <RaisedButton label="Fans" secondary={true} style={fanButton} />
          </div>
        </div>
          
      </div>
  </div>
      )
  }
}