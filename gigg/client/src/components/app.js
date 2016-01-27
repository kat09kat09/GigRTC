import React from 'react';
import { Component } from 'react';
import SideBar from './sidebar';
import Header from './header';
import VideoContainer from '../containers/video-container';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
        <SideBar/>
      </div>
    );
  }
}
