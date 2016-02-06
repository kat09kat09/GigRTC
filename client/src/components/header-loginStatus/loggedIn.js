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
import FlatButton from 'material-ui/lib/flat-button';
import MusicVideo from 'material-ui/lib/svg-icons/av/music-video';

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
            // showMenuIconButton={false}
            iconElementRight={
                <div>
                {props.userPrivelege === 'artist' ?
                 <RaisedButton
                   label="Create a Performance"
                   labelPosition="after"
                   backgroundColor="#fea92f "
                   icon={<MusicVideo />}
                   linkButton={true}
                   href="/streamYourself"
                 />
               :
                ""
               }

                  <IconMenu
                  iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                  }
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
<<<<<<< HEAD


                <MenuItem
                    linkButton={true}
                    primaryText="All Artists"
                    containerElement={<Link to="/router/registeredArtists" className="logoLink">registeredArtists</Link>} />

=======
                  <MenuItem
                      linkButton={true}
                      primaryText="All Artists"
                      containerElement={<Link to="/router/registeredArtists" className="logoLink">registeredArtists</Link>} />
>>>>>>> (BUG) fix login issue and rerendering

                  <MenuItem
                      linkButton={true}
                      primaryText={props.userPrivelege === 'artist' ? props.user_details.user_name : (props.userPrivelege === 'user' ?  props.user_details.name : 'Guest') }
                      containerElement={<Link to="/" className="logoLink">GIGG.tv</Link>} />

                  <MenuItem
                    linkButton={true}
                    primaryText="Home"
                    containerElement={<Link to="/landing" className="logoLink">Home</Link>} />

<<<<<<< HEAD

=======
<<<<<<< HEAD
>>>>>>> (BUG) fix login issue and rerendering
                   {props.userPrivelege === 'artist' ?
                    <MenuItem
                    linkButton={true}
                    primaryText="Broadcast"
                    containerElement={<Link to="/router/streamYourself" >Stream Yourself</Link>} />
                  :
                   ""

<<<<<<< HEAD

=======
=======
                  {props.userPrivelege === 'artist' ?
                      <MenuItem
                      linkButton={true}
                      primaryText="Broadcast"
                      containerElement={<Link to="/router/streamYourself" >Stream Yourself</Link>} />
                    :
                      ""
>>>>>>> (BUG) fix login issue and rerendering
>>>>>>> (BUG) fix login issue and rerendering
                  }

                  <MenuItem
                    linkButton={true}
                    primaryText="About"
                    containerElement={<Link to="/router/about" className="logoLink">About</Link>} />

                  <MenuItem primaryText="Sign out" onClick={() => props.logoutAndRedirect()} />

                </IconMenu>
                </div>

              }/>
    )
}

