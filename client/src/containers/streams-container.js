import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
// import { getActivePerformances , addTag} from '../actions';
import * as actions from '../actions';
import { Link } from 'react-router';
import _ from 'lodash';


import GridList from '../../node_modules/material-ui/lib/grid-list/grid-list';
import GridTile from '../../node_modules/material-ui/lib/grid-list/grid-tile';
import StarBorder from '../../node_modules/material-ui/lib/svg-icons/toggle/star-border';
import IconButton from '../../node_modules/material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import AutoComplete from 'material-ui/lib/auto-complete';
import Close from 'material-ui/lib/svg-icons/navigation/close';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 800,
    height: 600,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

export class StreamsContainer extends Component {
  constructor(props){
    super(props)
    this.state={
      text: '',
      typing: false,
      tagSearchText: '',
      filteredStreams: []
    }
  }

  componentWillMount(){
    const {dispatch}= this.props;


    dispatch(actions.getActivePerformances());

    const imgToUse = '../../public/img/crowd.jpg';
  }

  handleSave(tag) {
    const {dispatch}= this.props;
    if (tag.length !== 0) {

      dispatch(actions.addTag(tag));
    }
  }

  handleSubmit(performanceId, event) {
    const { userId} = this.props;

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
    const { userId} = this.props;
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

  handleTagSearch(searchTag) {
    if(searchTag.length>0){
      var filteredStreams= _.filter(this.props.presentActiveStreams, function(stream){
        return stream.tags.some(function(tag){
          return tag.tagname=== searchTag;
        })
      });
      this.setState({filteredStreams: filteredStreams});
    }
  }
  handleUpdateTagSearch(text){
    this.setState({tagSearchText: text})
  }

  handleClearFilter(){
    this.setState({tagSearchText: ''});
    this.setState({filteredStreams:[]})
  }

  render () {
    if (this.props.presentActiveStreams && this.props.presentActiveStreams.length) {
      return(
        <div style={ styles.root }>
           <AutoComplete
            floatingLabelText="Give me streams with this tag"
            filter={AutoComplete.fuzzyFilter}
            dataSource={this.props.activeTags}
            onNewRequest= {this.handleTagSearch.bind(this)}
            onUpdateInput= {this.handleUpdateTagSearch.bind(this)}
            searchText={this.state.tagSearchText}/>
            <IconButton
              tooltip="Clear Filter"
              onClick={this.handleClearFilter.bind(this)}>
              <Close />
            </IconButton>
          <br/>
          <GridList cellHeight={ 180 } style={ styles.gridList }>
            { this.renderEvents() }
          </GridList>
        </div>
      )
    } else {
      return (
        <div>
          <div>Welcome!</div>
          <img src={imgToUse} width='800' height='600' />
        </div>
      )
    }
  }

  // onSave={this.handleSave.bind(this, performance.id)
  renderEvents () {
    // return <div>Result</div>
    const style = {
      margin: 12,
    };

    var activeStreams;
    if(this.state.filteredStreams.length>0){
      console.log('displaying filtered streams');
      activeStreams= this.state.filteredStreams;
    } else {
      console.log('displaying unfiltered streams')
      activeStreams= this.props.presentActiveStreams;
    }
    // return this.props.presentActiveStreams.map((performance)=> {
    return activeStreams.map((performance)=> {
      return (
        <div>
          <Link to={`/router/activeStream/${performance.room}`}>
            <GridTile
            key={performance.id}

            title={performance.title}
            subtitle={<span>by <b>{performance.room}</b></span>}
            actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
            >
              <img src='../../public/img/crowd.jpg' />
            </GridTile>
          </Link>
          <div>
            {performance.tags.map(tag =>
              <RaisedButton label={tag.tagname} style={style} />
            )}
          </div>
          <input
                style={{
                  height: '100%',
                  fontSize: '2em',
                  marginBottom: '1em'
                }}
                type="textarea"
                autoFocus="true"
                placeholder="Add a tag"
                value={this.state.text}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleSubmit.bind(this, performance.id)}/>
        </div>
      )
    })
  }
}

function mapStateToProps(state){
  return {
    presentActiveStreams : state.data.activeStreams,
    userId: state.auth.userDetails.id,
    activeTags: state.data.activeTags
  }
}

export default connect(mapStateToProps)(StreamsContainer)