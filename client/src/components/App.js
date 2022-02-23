import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import useLocalStorage from './useLocalStorage';
import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';
import Alert from './Alert';

function App() {
  const [user, setUser] = useLocalStorage("user", null);
  const [logged, setLogged] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(()=>{
    setLogged(user == null ? false : true);
  }, [user])

  return (
    <Router>
      <Navigation logged={logged} logout={setUser} />
      { errors.length > 0 && <Alert messages={errors} /> }
      <Container>
        <Routes>
          <Route exact path="/" element={<Home logged={logged} />} />
          <Route exact path="/login" element={<Login login={setUser} alert={setErrors}/>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
