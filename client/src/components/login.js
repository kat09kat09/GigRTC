import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form'
import * as actionCreators from '../actions';

export class LoginView extends Component {

    constructor(props) {
        super(props);
    }

    login(props) {
        this.props.actions.loginUser(props,this.props.environment)


    }

    render(){
        const { fields:{userName,password}, handleSubmit} = this.props;
        return (
            <div className="loginForm">
                <form onSubmit={handleSubmit(this.login.bind(this))}>
                        <input type="text"   {...userName} placeholder="Enter a userName" />
                    <br/>
                        <input type="password"  {...password} placeholder="Plis password" />
                    <br/>
                    <button type="submit" className="btn btn-primary" >Submit</button>
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

    if(!values.userName){
        errors.userName = 'Enter a username'
    }
    if(!values.password){
        errors.password = 'Enter a password'
    }

    return errors
}

export default reduxForm({
    form : 'loginForm',
    fields : ['userName','password'],
    validate
},mapStateToProps,mapDispatchToProps)(LoginView)
