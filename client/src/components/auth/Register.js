import React from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { post } from 'axios';
import AuthForm from './AuthForm';
import HeaderParser from './HeaderParser';

const Register=({register, alert})=> {
  const navigate = useNavigate();

  const submit=(event)=> {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    post("/api/v1/auth", {"email": email, "password": password})
      .then(response => {
        register(HeaderParser(response.headers));
        navigate('/');
      })
      .catch(error => {
        alert(error.response.data.errors.full_messages);
      });
  };

  return (
    <Row className="justify-content-center">
      <Col className="col-lg-5 col-md-6 col-10">
        <h1 className="my-4">Sign Up</h1>
        <AuthForm action={submit} />
      </Col>
    </Row>
  )
}
export default Register;
