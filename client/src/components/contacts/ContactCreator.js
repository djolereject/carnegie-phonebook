import React, { useState } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import { post } from 'axios';
import ContactForm from './ContactForm';
import ErrorParser from './ErrorParser';

const ContactCreator=({headers, alert})=> {
  const [create, setCreate] = useState(false);
  const submit=(event)=> {
    event.preventDefault();
    setCreate(false);
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    post("/api/v1/contacts", {"contact": {"name": name, "phone": phone}}, {headers: headers})
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        alert(ErrorParser(error.response.data));
      });
  };

  return (
    <Row>
      <Col>
        { create ?
          <ContactForm action={submit} /> :
          <Button variant="outline-primary" onClick={()=>setCreate(true)}>Create new contact</Button>
        }
      </Col>
    </Row>
  )
}
export default ContactCreator;
