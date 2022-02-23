import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import useLocalStorage from './useLocalStorage';
import Navigation from './Navigation';
import Home from './Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Alert from './Alert';
import EditContact from './contacts/EditContact';

function App() {
  const [headers, setHeaders] = useLocalStorage("headers", null);
  const [errors, setErrors] = useState([]);

  return (
    <Router>
      <Navigation logged={headers != null} logout={setHeaders} />
      { errors.length > 0 && <Alert messages={errors} /> }
      <Container>
        <Routes>
          <Route exact path="/" element={<Home headers={headers} alert={setErrors} />} />
          <Route exact path="/login" element={<Login login={setHeaders} alert={setErrors}/>} />
          <Route exact path="/register" element={<Register register={setHeaders} alert={setErrors}/>} />
          <Route path="/contacts/:id" element={<EditContact headers={headers} alert={setErrors}/>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
