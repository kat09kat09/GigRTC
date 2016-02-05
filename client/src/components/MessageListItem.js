import React, { PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import FontIcon from 'material-ui/lib/font-icon';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

export default class MessageListItem extends React.Component {

  constructor(props) {
    super(props);
    console.log('this.props in MessageListItem', props)
  }
  
  render() {
    const { message } = this.props;
    console.log('messagelistitem', message); 
    return (
      <div>
        <ListItem
            disabled={true}
            leftAvatar={
              <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />
            }
          >
          <b style={{color: '#66c'}}>{message.user|| message.user_name}</b>
          <span>     </span>
          <i style={{color: '#aad', opacity: '0.8'}}>{message.time}</i>
          <div style={{clear: 'both', paddingTop: '0.1em', marginTop: '-1px', paddingBottom: '0.3em'}}>{message.text}</div>
        </ListItem>
        <Divider inset={true} />
      </div>
    );
  }
}
