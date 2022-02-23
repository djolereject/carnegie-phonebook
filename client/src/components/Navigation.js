import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

const Navigation=({logged, logout})=> {
  return (
    <Navbar bg="dark" sticky="top" expand="not-set" className="navbar-dark">
      <Navbar.Brand> Carnegie Phonebook </Navbar.Brand>
      <Navbar.Brand className="">
        { logged ?
          <NavLink to="/" onClick={()=>logout(null)} >Log Out</NavLink> :
          <NavLink to="/login">Log In</NavLink> }
      </Navbar.Brand>
    </Navbar>
  );
};
export default Navigation;
