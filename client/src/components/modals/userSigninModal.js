import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import LoginFBBtn from '../loginButtons/FBButton';
import SigninForm from '../forms/login'

const customContentStyle = {
    width: '50%',
    maxWidth: '450px',
    textAlign: 'center'

};

const titleStyle = {
    textAlign: 'center',
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    color: '#db436c'
};

class SigninModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {

        return (
            <div>
                <FlatButton
                    label = "LogIn as User"
                    onClick = {() => this.handleOpen()}
                    style = {{color: '#53b3cb'}} />
                <Dialog
                    title="Login"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <LoginFBBtn />
                </Dialog>


            </div>
        );
    }
}

export default SigninModal;
