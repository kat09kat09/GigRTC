import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/lib/raised-button';

import VideoContainer from './video-container';
import StreamButtons from '../components/streamButtons';
import saveBroadcast from '../actions/index';

export class ArtistContainer extends Component {

  componentWillMount(){
    console.log('PROPS FROM ARTIST CONTAINER SEE IF JSON TOKEN IS HERE')
  }

  onSubmit(props){
    this.props.saveBroadcast(props)
    .then(()=>{
        //something will happen here
        // this.context.router.push('/');
    })
  }
  render() {
    const {fields: {title, details}, handleSubmit} = this.props
    return (
      <div>

        <div className='streamYourself'>
          <form onSubmit= {handleSubmit(this.onSubmit.bind(this))}>
            <input
              type='text'
              className='form-control'
              {...title}
              placeholder='Title'>
            </input>
            <input
              type='text'
              className='form-control'
              {...details}
              placeholder='Details about the stream'>
            </input>
            <button type= 'submit'>
              Submit Stream Details
            </button>
          </form>
          <VideoContainer />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps= {
  saveBroadcast
}

export default reduxForm({
  form: 'BroadcastForm',
  fields: ['title', 'details']
}, null, mapDispatchToProps)(ArtistContainer)








