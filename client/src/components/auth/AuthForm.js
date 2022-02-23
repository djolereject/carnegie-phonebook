import React from "react";
import { Form, Button } from 'react-bootstrap';

const AuthForm=({action})=> {
  return (
    <Form onSubmit={action}>
      <Form.Group className="my-2">
        <Form.Label htmlFor="email">Email: </Form.Label>
        <Form.Control name="email" id="email" type="email" />
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control name="password" id="password" type="password" />
      </Form.Group>
      <Button type="submit" className="btn btn-dark my-2">Submit</Button>
    </Form>
  )
}
export default AuthForm;
