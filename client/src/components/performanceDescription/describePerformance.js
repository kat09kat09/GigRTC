import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/lib/text-field';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RaisedButton from 'material-ui/lib/raised-button';
import { MakePerformance }  from '../../actions';
import { Link } from 'react-router';
import ImageUpload from '../image_upload/image_upload';
import { connect } from 'react-redux';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';


class DescribePerformance extends Component {

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
    formData.room = this.props.userDetails.user_name;
    // console.log('formData ++++++++++++++++++', formData, '+++++++++++++++++ formData');
    this.props.MakePerformance(formData);
  }

  imageLoading(file) {
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  render() {

    const {
      handleSubmit,
      fields: {
          title,
          short_description,
          long_description,
          performance_image,
          rated_r
        }
      } = this.props

    const actions = [
      <FlatButton
          label="Cancel"
          secondary={true}
          onTouchTap={this.handleClose}
      />,
      <FlatButton
          label="Submit"
          primary={true}
          onTouchTap={this.handleClose}
      />
    ];

    return (
      <div className='performance-description-main'>
      <div className="formContainer">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h2>Describe your performance</h2>

          <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
            <TextField type="text" hintText="Title" floatingLabelText="Title" className="form-control" {...title} />
            <div className="text-help">
              {title.touched ? title.error : ''}
            </div>
          </div>

          <div className={`form-group ${short_description.touched && short_description.invalid ? 'has-danger' : ''}`}>
            <TextField type="text" hintText="Short Description" floatingLabelText="Short Description" className="form-control" {...short_description} />
            <div className="text-help">
              {short_description.touched ? short_description.error : ''}
            </div>
          </div>

          <div className={`form-group`}>
            <TextField
              type="text"
              hintText="Info to display about you and your art"
              floatingLabelText="Info to display about your gigg"
              multiLine={ true }
              rows={ 3 }
              rowsMax={ 16 }
              className="form-control" {...long_description}
            />
          </div>

          <div className={`form-group ${rated_r.touched && rated_r.invalid ? 'has-danger' : ''}`}>
            <RadioButtonGroup name="rated_r" className="form-control">
              <RadioButton
                // checked={rated_r === false}
                type="radio" {...rated_r}
                value="false"
                checked={rated_r.value === false}
                label="OK for kids and teens"
              />
              <RadioButton
                type="radio" {...rated_r}
                value="true"
                checked={rated_r.value === true}
                checked={rated_r === true}
                label="Needs a content warning"
              />
            </RadioButtonGroup>
            <div className="text-help">
              {rated_r.touched ? rated_r.error : ''}
            </div>
          </div>

          <div className="uploadDescriptionImg">
            <RaisedButton  label="Upload Image" onTouchTap={()=>this.handleOpen()} />
            <Dialog
              title="Give us an image to display for this performance"
              actions={actions}
              modal={true}
              autoScrollBodyContent={true}
              autoDetectWindowHeight={true}
              open={this.state.imageButton}
            >
              <ImageUpload {...performance_image}  />

            </Dialog>

          </div>

          <RaisedButton type="submit" >Submit</RaisedButton>

        </form>
        </div>
      </div>
    )
  }
}

function validate(values){
  const errors = {};

  if(!values.title){
    errors.title = 'Needs a title'
  }

  if(!values.short_description){
    errors.short_description = 'Needs a short description'
  }

  if(!values.rated_r){
    errors.rated_r = 'Will it be fine for teenagers and kids?'
  }

  return errors
}

// room is now available
const mapStateToProps = (state) => ({
  userDetails: state.auth.userDetails,
  state
});

export default reduxForm({
  form: 'DescribePerformance',
  fields : ['title', 'short_description', 'long_description', 'performance_image', 'rated_r'],
  validate
},mapStateToProps,{MakePerformance})(DescribePerformance)
