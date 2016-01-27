import React from 'react';
import { Component } from 'react';
import SideBar from './sidebar'; 
import StreamButtons from './streamButtons';


export default class App extends Component {
  render() {
    return (
      <div>
        <SideBar />
        <StreamButtons />
      </div>
    );
  }
}
