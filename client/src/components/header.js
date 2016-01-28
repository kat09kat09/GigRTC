import React, {Component} from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import Login from './login';
import {connect} from 'react-redux';
import {logoutAndRedirect,fetchProtectedData} from '../actions';

class Header extends Component {

    render() {
        return (
            <Navbar className="header">
                <Navbar.Header>

                    {this.props.isAuthenticated
                        ? <li className="loginForm"><a href='#' onClick={() => this.props.logoutAndRedirect()}>Logout</a> </li>
                        : <Login />
                    }
                    <Link to="/" className="logoLink"><h1>GIGG.TV</h1></Link>
                    <Link to="/streamYourself" className="streamYourselfLink"><div>Stream Yourself</div></Link>
                    <li><a href='#' onClick={() => this.props.fetchProtectedData(this.props.token)}>FOR JSON</a> </li>
                </Navbar.Header>
            </Navbar>
        );
    }
}

function mapStateToProps(state){
    return{
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token
    }
}

export default connect(mapStateToProps,{logoutAndRedirect,fetchProtectedData})(Header)
