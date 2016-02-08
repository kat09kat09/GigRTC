import React, { Component } from 'react';
import { browserHistory } from 'react-router';

const customContentStyleSignIn = {
    width: '25%',
    maxWidth: 'none'
};

const customContentStyleSignUp = {
    width: '50%',
    maxWidth: 'none'
};

const styles = {
    button: {
        width: '100%'
    }
};

export default class artistAuthenticationLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSignIn: false,
            openSignUp : false
        };
    }

    componentDidMount(){
        if(this.props.params.formType === 'signin'){
            this.setState({openSignIn: true});
        }
        else{
            this.setState({openSignUp: true});
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={()=>browserHistory.push('/')}
            />
        ];

        return (
            <div>
                <Dialog
                    title="Sign In"
                    actions={actions}
                    modal={true}
                    autoScrollBodyContent={true}
                    autoDetectWindowHeight={true}
                    open={this.state.openSignIn}
                    contentStyle={customContentStyleSignIn}
                >
                    <SigninForm />
                </Dialog>
                <Dialog
                    title="Sign Up"
                    actions={actions}
                    modal={true}
                    autoScrollBodyContent={true}
                    autoDetectWindowHeight={true}
                    open={this.state.openSignUp}
                    contentStyle={customContentStyleSignUp}
                >
                    <SignUpForm />

                </Dialog>

            </div>
        );
    }
}
