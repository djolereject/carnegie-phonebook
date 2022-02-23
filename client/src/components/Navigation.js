import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Navbar, Row } from 'react-bootstrap';

const Navigation=({logged, logout})=> {
  return (
    <Navbar bg="dark" sticky="top" expand="not-set" className="navbar-dark">
      <Navbar.Brand> Carnegie Phonebook </Navbar.Brand>
      <Navbar.Brand className="">
        { logged ?
          <NavLink to="/login" onClick={()=>logout(null)} >Log Out</NavLink> :
          <>
            <NavLink className="px-2" to="/login">Log In</NavLink>
            /
            <NavLink className="px-2" to="/register">Sign Up</NavLink>
          </>}
      </Navbar.Brand>
    </Navbar>
  );
};
export default Navigation;
