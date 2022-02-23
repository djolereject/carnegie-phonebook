import React from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { post } from 'axios';
import AuthForm from './AuthForm';
import HeaderParser from './HeaderParser';


const Login=({login, alert})=> {
  const navigate = useNavigate();

  const clickLogin=(event)=> {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    post("/api/v1/auth/sign_in", {"email": email, "password": password})
      .then(response => {
        login(HeaderParser(response.headers));
        navigate('/');
      })
      .catch(error => {
        alert(error.response.data.errors);
      });
  };

  return (
    <Row className="justify-content-center">
      <Col className="col-lg-5 col-md-6 col-10">
        <h1 className="my-4">Log In</h1>
        <AuthForm action={clickLogin} />
      </Col>
    </Row>
  )
}
export default Login;
