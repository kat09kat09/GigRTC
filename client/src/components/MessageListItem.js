import React, { PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import FontIcon from 'material-ui/lib/font-icon';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class MessageListItem extends React.Component {
  // static propTypes = {
  //   message: PropTypes.object.isRequired
  // };
  // handleClick(user) {
  //   this.props.handleClickOnUser(user);
  // }
  constructor(props) {
    super(props);
    // this.state = {
    //   text: '',
    //   typing: false
    // };
    console.log('this.props in MessageListItem', props)

    

  }
  

  render() {
    const { message } = this.props;
    return (
       <ListItem
          disabled={true}
          leftAvatar={
            <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />
          }
        >
        <b style={{color: '#66c'}}>{message.user}</b>
        <i style={{color: '#aad', opacity: '0.8'}}>{message.time}</i>
        <div style={{clear: 'both', paddingTop: '0.1em', marginTop: '-1px', paddingBottom: '0.3em'}}>{message.text}</div>
      </ListItem>
    );
  }
}
