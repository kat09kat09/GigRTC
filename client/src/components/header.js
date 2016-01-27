import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';

export default () => {
  return (
    <Navbar className="header">
      <Navbar.Header>
         
          <Link to="/" className="logoLink"><h1>GIGG.TV</h1></Link>
         
      </Navbar.Header>
    </Navbar>
  );
}
