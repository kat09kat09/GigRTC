import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form'
import * as actionCreators from '../../actions';
import { TextField } from 'material-ui';
import FlatButton from 'material-ui/lib/flat-button';

export class LoginView extends Component {

    constructor(props) {
        super(props);
    }

    login(props) {

        this.props.actions.loginArtist(props)
    }


    render(){
        const { fields:{user_name,password}, handleSubmit} = this.props;
        return (
            <div className="loginForm">
                <form onSubmit={handleSubmit(this.login.bind(this))}>
                    <TextField type="text"   {...user_name} placeholder="Enter a userName" />
                    <br/>
                    <TextField type="password"  {...password} placeholder="Plis password" />
                    <br/>
                    <FlatButton label="Submit" type="submit" keyboardFocused={true}/>
                </form>
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    isAuthenticating   : state.auth.isAuthenticating,
    statusText         : state.auth.statusText,
    environment : state.environment
});

const mapDispatchToProps = (dispatch) => ({
    actions : bindActionCreators(actionCreators, dispatch)
});



function validate(values){
    const errors = {};

    if(!values.user_name){
        errors.user_name = 'Enter a username'
    }
    if(!values.password){
        errors.password = 'Enter a password'
    }

    return errors
}

export default reduxForm({
    form : 'loginForm',
    fields : ['user_name','password'],
    validate
},mapStateToProps,mapDispatchToProps)(LoginView)
