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
              <h2> Venkatesh Namburi </h2>
              <h3> Scrum Master / Engineer </h3>           
            </div>
            <div className="auggie avatar">
              <Avatar src="../../../public/img/a.png" size="150"></Avatar>
              <h2> Auggie (Jerome) Hudak </h2>
              <h3> Product Owner / Engineer </h3>
            </div>
            <div className="madeline avatar">
              <Avatar src="../../../public/img/m.png" size="150"></Avatar>
              <h2> Madeline Bernard </h2>
              <h3> Engineer </h3>
            </div>
            <div className="kathlyn avatar">
              <Avatar src="../../../public/img/k.png" size="150"></Avatar>
              <h2> Kathlyn Ngo </h2>
              <h3> Engineer </h3>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

