import React from 'react';
import { Component } from 'react';
import Avatar from 'material-ui/lib/avatar';

export default class About extends Component {
  render(){
    return(
      <div>
        <div className="wrapper">
          <h1 className="center-block">Team Dream Stream</h1>
          <div className="avatars">
            <div className="venkatesh avatar">
              <Avatar src="../../../public/img/v.png" size="150"></Avatar>
            </div>
            <div className="auggie avatar">
            <Avatar src="../../../public/img/a.png" size="150"></Avatar>

            </div>
            <div className="madeline avatar">
            <Avatar src="../../../public/img/m.png" size="150"></Avatar>
            </div>
            <div className="kathylyn avatar">
            <Avatar src="../../../public/img/k.png" size="150"></Avatar>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

