import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import VideoPlayer from './containers/video-container';
import StreamsContainer from './containers/streams-container';
import Login from './components/forms/login';
import {requireAuthentication} from './components/AuthenticatedComponent';
import ArtistContainer from './containers/artist-container';
import AuthenticationContainer from './components/auth/authenticatePage';
import {videoHigherOrderFunction} from './containers/watchAndHost/watchingHigherOrder'
import ArtistAuthenticationLanding from './components/artistAuthentication/artistAuthenticationLanding'
import RegisteredArtists from './components/registeredArtists/registeredArtists'
import ArtistPage from './components/artistShowPage'
import Chat from './components/Chat';
import About from './components/about/about';
import Landing from './components/landing/landing';
import ArtistLand from './components/landing/artistLand';
import FanLand from './components/landing/fanLand';


export default (

    <Route path="/" component={ App } >

        <IndexRoute component={ Landing } />
        <Route path="router/streamYourself" component={videoHigherOrderFunction(VideoPlayer)} />
        <Route path="router/socialLogin" component={AuthenticationContainer} />
        <Route path="router/nowStreaming" component={StreamsContainer} />
        <Route path="router/artistAuthenticate/:formType" component={ArtistAuthenticationLanding} />
        <Route path="router/registeredArtists" component={RegisteredArtists} />
        <Route path="router/activeStream/:room" component={videoHigherOrderFunction(VideoPlayer)} />
        <Route path="router/about" component={About} />
        <Route path="router/artistLand" component={ArtistLand} />
        <Route path="router/fanLand" component={FanLand} />
        <Route path="router/landing" component={Landing} />
        <Route path="router/artistPage/:artist_name" component={ArtistPage} />
    </Route>

);
