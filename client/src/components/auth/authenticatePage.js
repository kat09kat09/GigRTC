import React from 'react';
import { Component } from 'react';

import {getSocialDetails} from '../../actions/index.js';
import {connect} from 'react-redux';



export class AuthenticatePage extends Component {


    componentWillMount(){
        let tokenStatus = this.props.auth.token;

            this.props.getSocialDetails().then(function(){
                console.log("SOCIAL LOGIN",this.props.auth)
            }.bind(this))
            console.log('Authentication Page FOR SOCIAL being called')

    }


    render() {
        return (
            <div className="authenticationPageBody">
                <div className="login">
                    YOUR LOGIN IS BEING AUTHENTICATED!
                </div>
            </div>
        );
    }
}

export default connect(state=>state,{getSocialDetails})(AuthenticatePage)
