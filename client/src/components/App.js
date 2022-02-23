import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import useLocalStorage from './useLocalStorage';
import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';

function App() {
  const [user, setUser] = useLocalStorage("user", null);
  const [logged, setLogged] = useState(false);

  useEffect(()=>{
    setLogged(user == null ? false : true);
  }, [user])

  return (
    <Router>
      <Navigation logged={logged} logout={setUser} />
      <Container>
        <Routes>
          <Route exact path="/" element={<Home logged={logged} />} />
          <Route exact path="/login" element={<Login login={setUser} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
