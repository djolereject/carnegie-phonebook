import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Navbar bg="dark" sticky="top" expand="not-set" className="navbar-dark">
        <Navbar.Brand> Carnegie Phonebook </Navbar.Brand>
        <Navbar.Brand className="touchable mr-n4 mt-0 mt-md-2">
          <Button onClick={() => {}} className="">
Klik
          </Button>
        </Navbar.Brand>
      </Navbar>
    </Router>
  );
}

export default App;
