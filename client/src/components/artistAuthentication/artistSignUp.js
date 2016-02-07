import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import Paper from 'material-ui/lib/paper'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import RadioButton from 'material-ui/lib/radio-button'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import {SignUpArtist}  from '../../actions';
import {Link} from 'react-router'
import Dropzone from 'react-dropzone';
import ImageUpload from '../image_upload/image_upload'
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

class ArtistSignUp extends Component {

    constructor(props) {
        super(props)
        this.state={
            imageButton : false
        }
    }

    handleOpen = () => {
       this.setState({imageButton: true});
    };

    handleClose = () => {
        this.setState({imageButton: false});
    };

    onSubmit(formData) {
        console.log("FORM DATA",formData)
        this.props.SignUpArtist(formData)
    }

    imageLoading(file) {
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                file: reader.result
            });
            console.log("IMAGE",reader.result)
        }
        reader.readAsDataURL(file)

    }

    render() {

        const {
            handleSubmit,
            fields: {
                user_name, password, email_id, brief_description,
                user_image, display_name,genre}
            } = this.props

        const actions = [

            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />
        ];

        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h3>Sign Up</h3>
                    <div className={`form-group ${user_name.touched && user_name.invalid ? 'has-danger' : ''}`}>
                        <TextField hintText="User Name" floatingLabelText="User Name" className="form-control"  {...user_name} />
                        <div className="text-help">
                            {user_name.touched ? user_name.error : ''}
                        </div>
                    </div>
                    <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
                        <TextField type="password" hintText="password" floatingLabelText="Password" className="form-control"  {...password} />
                        <div className="text-help">
                            {password.touched ? password.error : ''}
                        </div>
                    </div>
                    <div className={`form-group ${email_id.touched && email_id.invalid ? 'has-danger' : ''}`}>
                        <TextField type="email" hintText="Email Address" className="form-control" floatingLabelText="Email Address" {...email_id} />
                        <div className="text-help">
                            {email_id.touched ? email_id.error : ''}
                        </div>
                    </div>

                    <div className={`form-group ${brief_description.touched && brief_description.invalid ? 'has-danger' : ''}`}>
                        <TextField hintText="Brief Description" className="form-control"
                        floatingLabelText="Brief Description"
                        multiLine={true}
                        rows={2}
                        rowsMax={4}
                        {...brief_description} />
                        <div className="text-help">
                            {brief_description.touched ? brief_description.error : ''}
                        </div>
                    </div>

                    <div className={`form-group ${display_name.touched && display_name.invalid ? 'has-danger' : ''}`}>

                        <TextField hintText="Display Name" floatingLabelText="Display Name" className="form-control"  {...display_name} />
                        <div className="text-help">
                            {display_name.touched ? display_name.error : ''}
                        </div>
                    </div>
                    <div className={`form-group ${genre.touched && genre.invalid ? 'has-danger' : ''}`}>
                        <TextField hintText="Genre"
                        floatingLabelText="Genre"
                        className="form-control"  {...genre} />
                        <div className="text-help">
                            {genre.touched ? genre.error : ''}
                        </div>
                    </div>

                    <div>
                        <RaisedButton label="Upload Image" onTouchTap={()=>this.handleOpen()} />
                        <Dialog
                            title="Image Up"
                            actions={actions}
                            modal={true}
                            autoScrollBodyContent={true}
                            autoDetectWindowHeight={true}
                            open={this.state.imageButton}
                        >
                            <ImageUpload {...user_image}  />

                        </Dialog>

                    </div>

                    <RaisedButton type="submit" >Submit</RaisedButton>

                </form>
            </div>
        )
    }
}

function validate(values){
    const errors = {};

    if(!values.user_name){
        errors.user_name = 'Enter a username'
    }
    if(!values.password){
        errors.password = 'Enter a password'
    }
    if(!values.email_id){
        errors.email_id = 'Enter an email'
    }
    if(!values.brief_description){
        errors.brief_description = 'Enter a brief description'
    }
    if(!values.user_image){
        errors.user_image = 'Upload an image'
    }
    if(!values.display_name){
        errors.display_name = 'Enter a Display Name'
    }
    if(!values.genre){
        errors.genre = 'Enter a genre'
    }

    return errors
}


export default reduxForm({
    form: 'ArtistSignUp',
    fields : ['user_name', 'password', 'email_id', 'brief_description',
        'user_image', 'display_name', 'genre'],
    validate
},null,{SignUpArtist})(ArtistSignUp)
