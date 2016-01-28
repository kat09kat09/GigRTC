import React, {Component} from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import Login from './login';
import {connect} from 'react-redux';
import {logoutAndRedirect,fetchProtectedData} from '../actions';

class Header extends Component {

    render() {
        return (
            // <div>
                <Navbar className="header">
                    <Navbar.Header>
                        <div className="titleHome">
                            <Link to="/" className="logoLink"><h1>GIGG.TV</h1></Link>
                        </div>
                        <div className="navigation">
                            <div className="streamYourselfLink">
                                <Link to="/streamYourself" ><span className='streamYourselfLinkText'>Stream Yourself</span></Link>
                            </div>
                            <div className='jsonLink'>
                                <a href='#' className='jsonLinkText' onClick={() => this.props.fetchProtectedData(this.props.token)}>FOR JSON</a>
                            </div>
                            <div className='loginLink'>
                                {this.props.isAuthenticated
                                    ? <li className="loginForm"><a href='#' onClick={() => this.props.logoutAndRedirect()}>Logout</a> </li>
                                    : <Login />
                                }
                            </div>
                        </div>
                        
                    <Link to="/" className="logoLink"><h1>GIGG.TV</h1></Link>
                    <Link to="/streamYourself" className="streamYourselfLink"><div>Stream Yourself</div></Link>
                    <li><a href='#' onClick={() => this.props.fetchProtectedData(this.props.token,this.props.environment)}>FOR JSON</a> </li>
                </Navbar.Header>
            </Navbar>
        );
    }
}

function mapStateToProps(state){
    return{
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
        environment : state.environment
    }
}

export default connect(mapStateToProps,{logoutAndRedirect,fetchProtectedData})(Header)
