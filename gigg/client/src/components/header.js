import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';

export default () => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/" >Gigg.TV</Link>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
}
