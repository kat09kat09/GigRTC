import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import Login from './login';

export default () => {
  return (
    <Navbar className="header">
      <Navbar.Header>

          <Link to="/video" className="logoLink"><h1>GIGG.TV</h1></Link>

          <Login />
      </Navbar.Header>
    </Navbar>
  );
}
