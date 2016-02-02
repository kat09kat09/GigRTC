import React, {Component} from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import Login from './forms/login';
import {connect} from 'react-redux';
import {logoutAndRedirect,fetchProtectedData} from '../actions';


import FBLoginBtn from './loginButtons/FBButton'
import SignInModal from './modals/signinModal'

import NotLoggedInHeader from './header-loginStatus/notLoggedIn'
import LoggedInHeader from './header-loginStatus/loggedIn'

export class Header extends Component {

    constructor(props) {
      super(props);
      this.state = {open: false};
    }


    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (

          <div>

              <div>
              {this.props.isAuthenticated
                ? <LoggedInHeader user_details={this.props.userDetails}
                                  logoutAndRedirect={this.props.logoutAndRedirect.bind(this)}
                  />
                : <NotLoggedInHeader/>
              }
              </div>

          </div>
        );
    }
}

function mapStateToProps(state){
    return{
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
        environment : state.environment,
        userDetails : state.auth.userDetails
    }
}

export default connect(mapStateToProps,{logoutAndRedirect,fetchProtectedData})(Header)
