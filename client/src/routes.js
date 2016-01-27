import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import VideoPlayer from './containers/video-container';
import ArtistContainer from './containers/artist-container'; 


export default (
  <div>
    <Route path="/" component={ App } >

      <IndexRoute component={VideoPlayer} />
      <Route path="streamYourself" component={ArtistContainer} />

    </Route>

  </div>

);
