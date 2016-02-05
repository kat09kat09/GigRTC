import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import Paper from 'material-ui/lib/paper'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import DropDownMenu from 'material-ui/lib/DropDownMenu' //
import MenuItem from 'material-ui/lib/menus/menu-item'
import RadioButton from 'material-ui/lib/radio-button'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import {SignUpArtist}  from '../../actions'; // FIXME
import {Link} from 'react-router'
import Dropzone from 'react-dropzone';


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
          <TextField hintText="Title" floatingLabelText="Title" className="form-control"  {...title} />
          <div className="text-help">
            {user_name.touched ? user_name.error : ''}
          </div>
        </div>

        <div className={`form-group ${short_description.touched && short_description.invalid ? 'has-danger' : ''}`}>
          <TextField hintText="Short Description" floatingLabelText="Short Description" className="form-control"  {...short_description} />
          <div className="text-help">
            {short_description.touched ? short_description.error : ''}
          </div>
        </div>

        <div className={`form-group ${long_description.touched && long_description.invalid ? 'has-danger' : ''}`}>
          <TextField hintText="More info about you and your art" floatingLabelText="More info about you and your art" className="form-control" {...long_description} />
          <div className="text-help">
            {long_description.touched ? long_description.error : ''}
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
        <label>Image</label>
        <div>
        <Dropzone
        onDropAccepted={this.imageLoading.bind(this)}
        { ...user_image }
        onDrop={ ( filesToUpload, e ) => user_image.onChange(filesToUpload) }
        >
        <div>Try dropping some files here, or click to select files to upload.</div>
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
    errors.rated_r = 'It is ok for teens and kids?'
  }

  return errors
}


export default reduxForm({
  form: 'DescribePerformance',
  fields : ['title', 'short_description', 'long_description', 'performance_image', 'rated_r'],
  validate
},null,{MakePerformance})(DescribePerformance)
