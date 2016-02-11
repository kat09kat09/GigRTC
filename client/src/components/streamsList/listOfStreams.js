import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getActivePerformances } from '../../actions';
import { Link } from 'react-router';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import PlayCircleOutline from 'material-ui/lib/svg-icons/av/play-circle-outline';

export class StreamsUL extends Component {

  componentWillMount(){
    this.props.getActivePerformances()
  }

  render () {
    if (this.props.presentActiveStreams && this.props.presentActiveStreams.length) {
      return(
        <div>
          <ul className="sidebar-ul-landing">
            {this.renderEvents()}
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          <span>Stream Yourself!</span>
        </div>
      )
    }
  }

  renderEvents () {
    return this.props.presentActiveStreams.map((performance)=> {
      return (
        <li className="sidebar-li" key={performance.room} style={{"marginTop": "1em"}}>
        <Link to={`/router/activeStream/${performance.room}`} style={{"color": "white"}}>
          {performance.title} by {performance.room}
        </Link>
        </li>
      )
    })
  }

}

function mapStateToProps(state){
  return {
    presentActiveStreams : state.data.activeStreams
  }
}

const mapDispatchToProps = {
  getActivePerformances
};

export default connect(mapStateToProps,mapDispatchToProps)(StreamsUL)
