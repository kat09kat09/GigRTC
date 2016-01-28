import React from 'react';
import { Component } from 'react';
import SideBar from './sidebar';
import Header from './header';
import VideoContainer from '../containers/video-container';
import ArtistContainer from '../containers/artist-container';

export default class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <div className="videoWrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}
