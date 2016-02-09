import React, { Component } from 'react';
import {bindActionCreators} from 'redux'; 
import { connect } from 'react-redux';
// import { getActivePerformances , addTag} from '../actions';
import * as actions from '../actions'; 
import { Link } from 'react-router';



import GridList from '../../node_modules/material-ui/lib/grid-list/grid-list';
import GridTile from '../../node_modules/material-ui/lib/grid-list/grid-tile';
import StarBorder from '../../node_modules/material-ui/lib/svg-icons/toggle/star-border';
import IconButton from '../../node_modules/material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';



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
      typing: false
     
    }
  }

  componentWillMount(){
    const {dispatch}= this.props; 
    // this.props.getActivePerformances()

    //TODO uncomment before deployement
    dispatch(actions.getActivePerformances());
    dispatch(actions.getAllStreams());

    // var activeTags= this.props.presentActiveStreams.reduce((allTags,stream) =>{
    //   stream.tags.forEach(tag =>{
    //     allTags[tag.tagname]=true;
    //   })
    // }, {});
    // this.setState({activeTags: Object.keys(activeTags)}); 
  }

  handleSave(tag) {
    const {dispatch}= this.props; 
    console.log('this.props in streams-container', this.props)
    console.log('handlesave is called with tag: ', tag)
    if (tag.length !== 0) {
      // this.props.addTag(tag);
      dispatch(actions.addTag(tag)); 
    }
  }

  handleSubmit(performanceId, event) {
    console.log('performanceId in handle submit' ,performanceId); 
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
      console.log('need to be logged in to add tag')
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

  render () {
    console.log('this.props in streams-container', this.props); 
    if (this.props.presentActiveStreams && this.props.presentActiveStreams.length) {
      return(
        <div style={ styles.root }>
          <GridList cellHeight={ 180 } style={ styles.gridList }>
            { this.renderEvents() }
          </GridList>
        </div>
      )
    } else {
      return (
        <div>
          <div>Welcome!</div>
          <img src='../../public/img/crowd.jpg' width='800' height='600' />
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
    return this.props.presentActiveStreams.map((performance)=> {
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
    userId: state.auth.userDetails.id
  }
}

// const mapDispatchToProps = {
//   getActivePerformances,
//   addTag
// };

// export default connect(mapStateToProps,mapDispatchToProps)(StreamsContainer)

export default connect(mapStateToProps)(StreamsContainer)