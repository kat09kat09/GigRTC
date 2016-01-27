import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import VideoPlayer from './containers/video-container';


export default (
  <Route path="/" component={ App } >

    <IndexRoute component={VideoPlayer} />

  </Route>
);
