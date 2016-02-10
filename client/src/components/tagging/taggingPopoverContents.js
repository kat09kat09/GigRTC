import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { getActivePerformances , addTag} from '../actions';
import * as actions from '../../actions';

export default class TaggingPopoverContents extends React.Component {

  constructor(props){
    super(props);

    this.state={
      text: '',
      typing: false,
    }
  }

  componentWillMount(){
    const {dispatch}= this.props;

    dispatch(actions.getActivePerformances());
  }

  handleSave(tag) {
    const {dispatch}= this.props;
    if (tag.length !== 0) {

      dispatch(actions.addTag(tag));
    }
  }

  handleSubmit(performanceId, event) {
    const { userId } = this.props;

    const text = event.target.value.trim();
    if (event.which === 13) { //carriage return
      event.preventDefault();
      var newTag = {
        tagname: text,
        user_id: userId,
        performanceId: performanceId
      };
      this.handleSave(newTag);
      this.setState({ text: '', typing: false });
    }
  }

  handleChange(event) {
    const { userId } = this.props;
    if(!userId) {
      //need to be logged in to submit a tag
    } else {
      this.setState({ text: event.target.value });
      if (event.target.value.length > 0 && !this.state.typing) {
        this.setState({ typing: true});
      }
      if (event.target.value.length === 0 && this.state.typing) {
        this.setState({ typing: false});
      }
    }
  }

  render() {
    return (
      <div className="tagInput">
        <input
          style={{
            height: '100%',
            fontSize: '2em',
            marginBottom: '1em',
          }}
          type="textarea"
          autoFocus="true"
          placeholder="Add a tag"
          value={this.state.text}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleSubmit.bind(this, performance.id)}
        />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    presentActiveStreams : state.data.activeStreams,
    userId: state.auth.userDetails.id,
    activeTags: state.data.activeTags
  }
}

export default connect(mapStateToProps)(TaggingPopoverContents)
