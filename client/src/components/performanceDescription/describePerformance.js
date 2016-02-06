import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/lib/text-field'
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RaisedButton from 'material-ui/lib/raised-button'
import { MakePerformance }  from '../../actions';
import { Link } from 'react-router'
import ImageUpload from '../image_upload/image_upload';

// put this instead of chat on broadcast page, disabling buttons, until there is a title submitted?

class DescribePerformance extends Component {

  constructor(props) {
    super(props)
    this.state={
      file : null
    }
  }

  onSubmit(formData) {
    this.props.MakePerformance(formData)
  }

  imageLoading(files) {
    const file = files[0];
    this.setState({
      file: file,
    });
  }

  render() {

    const {
      handleSubmit,
      fields: {
          title,
          short_description,
          long_description,
          performance_image,
          rated_r,
          room
        }
      } = this.props

    return (
      <div>
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
              floatingLabelText="Info to display about you and your art"
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
                value={false}
                checked={rated_r.value === false}
                label="OK for kids and teens"
              />
              <RadioButton
                type="radio" {...rated_r}
                value={true}
                checked={rated_r.value === true}
                checked={rated_r === true}
                label="Needs a content warning"
              />
            </RadioButtonGroup>
            <div className="text-help">
              {rated_r.touched ? rated_r.error : ''} // FIXME need error if it's not touched
            </div>
          </div>

          <div className={`form-group`}> // this is a cludge to get styling correct
            <TextField defaultValue="Image for this performance" className="form-control" />
            <div>
              <ImageUpload {...performance_image}/>
            </div>
          </div>

          // I still don't know how to get username
          <h3>{this.props.user_name}</h3>
          // to submit with the form as "room"
          <div className='hidden'>hi</div>

          <RaisedButton type="submit" >Submit</RaisedButton>

        </form>
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

// room is now available to this form
function mapStateToProps(state) {
  return {
    userDetails: state.auth.userDetails
  }
}

export default reduxForm({
  form: 'DescribePerformance',
  fields : ['title', 'short_description', 'long_description', 'performance_image', 'rated_r', 'room'],
  validate
},mapStateToProps,{MakePerformance})(DescribePerformance)
