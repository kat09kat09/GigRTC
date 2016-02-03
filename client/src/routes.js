import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import VideoPlayer from './containers/video-container';
import GridListExampleSimple from './containers/streams-container';
import Login from './components/forms/login';
import {requireAuthentication} from './components/AuthenticatedComponent';
import ArtistContainer from './containers/artist-container';
import AuthenticationContainer from './components/auth/authenticatePage';
import {videoHigherOrderFunction} from './containers/watchAndHost/watchingHigherOrder'
import ArtistAuthenticationLanding from './components/artistAuthentication/artistAuthenticationLanding'
import Chat from './components/Chat';
import land from './components/homepage/landing_component';

export default (


    <Route path="/" component={ App } >

        <IndexRoute component={ GridListExampleSimple } />
        <Route path="streamYourself" component={videoHigherOrderFunction(VideoPlayer)} />
        <Route path="authenticateFacebook" component={AuthenticationContainer} />
        <Route path="artistSignIn" component={ArtistAuthenticationLanding} />
    </Route>

);
