import React from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { post } from 'axios';

const Login=({login, alert})=> {

  const navigate = useNavigate();

  const clickLogin=(event)=> {
    event.preventDefault();
    // const email = document.getElementById("email").value;
    // const password = document.getElementById("password").value;
    const request = {"email": "email.gmail.com", "password": "password"};

    post("/api/v1/auth/sign_in", request)
      .then(response => {
        const result = {...response.data.data, 'access-token': response.headers['access-token']}
        console.log(result);
        login(result);
        navigate('/');
      })
      .catch(error => {
        alert(error.response.data.errors);
      });
  };

  return (
    <Row>
      <Col >
        <h1>Log In</h1>
        <Form onSubmit={clickLogin}>
          <Form.Group>
            <Form.Label htmlFor="email">Email: </Form.Label>
            <Form.Control name="email" id="email" type="email" />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password:</Form.Label>
            <Form.Control name="password" id="password" type="password" />
          </Form.Group>
          <Button type="submit" className="btn btn-dark">Submit</Button>
        </Form>
      </Col>
    </Row>
  )
}
export default Login;
