import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/lib/text-field'
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RaisedButton from 'material-ui/lib/raised-button'
import { MakePerformance }  from '../../actions';
import { Link } from 'react-router'
import Dropzone from 'react-dropzone';

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
          rated_r
        }
      } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Describe your performance</h3>

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
                checked={rated_r === false}
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

          <div>
            <label>Image for this performance</label>
            <div>
              <Dropzone
                onDropAccepted={this.imageLoading.bind(this)}
                { ...performance_image }
                onDrop={ ( filesToUpload, e ) => performance_image.onChange(filesToUpload) }
              >
                <div>Drag and drop a file here, or click to select a file to upload.</div>
              </Dropzone>
            </div>

            {this.state.file ?
            <div>
              <h6>Image Preview:</h6>
              <div>
                <img style={{height: 100 + 'px'}} src={this.state.file.preview} />
              </div>
            </div> : null}
          </div>

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


export default reduxForm({
  form: 'DescribePerformance',
  fields : ['title', 'short_description', 'long_description', 'performance_image', 'rated_r'],
  validate
},null,{MakePerformance})(DescribePerformance)
