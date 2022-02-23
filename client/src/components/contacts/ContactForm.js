import React from "react";
import { Form, Button } from 'react-bootstrap';

const ContactForm=({action})=> {
  return (
    <Form onSubmit={action} className="form-row align-items-end">
      <Form.Group className="mx-2 col-6">
        <Form.Label htmlFor="name">Name: </Form.Label>
        <Form.Control name="name" id="name" type="name" />
      </Form.Group>
      <Form.Group className="mx-2 col-3">
        <Form.Label htmlFor="phone">Phone:</Form.Label>
        <Form.Control name="phone" id="phone" type="phone" />
      </Form.Group>
      <Button type="submit" className="btn btn-dark mx-2 col-1">Submit</Button>
    </Form>
  )
}
export default ContactForm;
