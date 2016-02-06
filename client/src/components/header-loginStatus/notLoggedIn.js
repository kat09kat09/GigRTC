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
import TestModal from '../../components/test_modal'

import SignInModal from '../modals/userSigninModal'

const styles = {
  title: {
    cursor: 'pointer',
  },
};

export default (props)=>{
    return (
        <AppBar
            title={<span style={styles.title}><Link to="/" className="logoLink">GIGG.TV</Link></span>}
            className="header"
            iconElementLeft={<img src='../../public/img/rocket.svg' height='40' width='40' alt='' />}
            iconElementRight={
                <IconMenu
                  iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                  }
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                <MenuItem
                    linkButton={true}
                    primaryText="All Artists"
                    containerElement={<Link to="/router/registeredArtists" className="logoLink">registeredArtists</Link>} />
                  <MenuItem
                    linkButton={true}
                    primaryText="Home"
                    containerElement={<Link to="/" className="logoLink">GIGG.tv</Link>} />
                  <MenuItem
                    linkButton={true}
                    primaryText="About"
                    containerElement={<Link to="/router/about" className="logoLink">About</Link>} />

                  <MenuItem primaryText="Sign in" containerElement={ <SignInModal/>} />
                  <MenuItem
                    linkButton={true}
                    primaryText="Login as Artist"
                    containerElement={<Link to="/router/artistAuthenticate/signin" >Sign in/Up </Link>} />
                  <MenuItem
                    linkButton={true}
                    primaryText="Sign Up as Artist"
                    containerElement={<Link to="/router/artistAuthenticate/signup" >Sign in/Up </Link>} />
                </IconMenu>
              }/>
    )
}
