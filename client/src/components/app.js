import React from 'react';
import { Component } from 'react';
import SideBar from './sidebar';
import Header from './header';

import {determineEnvironment} from '../actions';
import {connect} from 'react-redux';


export class App extends Component {

  componentWillMount(){
      this.props.determineEnvironment()

  }

  render() {
    return (
      <div className="appComponentBody">
        <Header/>
        <SideBar/>
        <div className="videoWrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
    return {
        environment : state.environment
    }
}

export default connect(mapStateToProps,{determineEnvironment})(App)
