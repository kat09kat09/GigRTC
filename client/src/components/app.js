import React from 'react';
import { Component } from 'react';
import SideBar from './sidebar';
import Header from './header';
import VideoContainer from '../containers/video-container';
import ArtistContainer from '../containers/artist-container';
import {determineEnvironment} from '../actions';
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui from 'material-ui';
import AppBar from 'material-ui/lib/app-bar';

console.log(mui); 

let ThemeManager = mui.Styles.ThemeManager;
let Colors = mui.Styles.Colors;
let Style= mui.Styles.LightRawTheme;

injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props); 
  }

  componentWillMount(){
      this.props.determineEnvironment()

  }

  getChildContext() { 
    return {
      stores: this.props.stores,
      muiTheme: ThemeManager.getMuiTheme(Style)
    };
  }

  render() {
    return (
      <div>
        <Header/>
        <SideBar/>
        <div className="videoWrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  stores: React.PropTypes.object,
  muiTheme: React.PropTypes.object
};

function mapStateToProps(state){
    return {
        environment : state.environment
    }
}

export default connect(mapStateToProps,{determineEnvironment})(App)
