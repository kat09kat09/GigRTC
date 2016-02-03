import React from 'react'
import { Link } from 'react-router';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/lib/flat-button'

export default (props)=>{
    return (
        <AppBar
            title="GIGG.TV"
            containerElement={<Link to="/" className="logoLink">Gigg</Link>}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            iconElementRight={
                <div>
                  <IconMenu
                  iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                  }
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem
                    linkButton={true}
                    primaryText="Home"
                    containerElement={<Link to="/" className="logoLink">GIGG.tv</Link>} />
                  <MenuItem
                    linkButton={true}
                    primaryText="Broadcast"
                    containerElement={<Link to="/streamYourself" >Stream Yourself</Link>} />
                  <MenuItem><a href='#' className='jsonLinkText' onClick={() => this.props.fetchProtectedData(this.props.token)}>FOR JSON</a></MenuItem>
                  <MenuItem primaryText="Sign out" onClick={() => props.logoutAndRedirect()} />
                </IconMenu>
                </div>

              }/>
    )
}
