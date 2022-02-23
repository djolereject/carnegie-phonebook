import React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import { put } from 'axios';
import useAxios from "axios-hooks";
import ContactForm from './ContactForm';
import ErrorParser from './ErrorParser';

const EditContact=({headers, alert})=> {
  const navigate = useNavigate();
  const params = useParams();
  const [{ data }] = useAxios({url: `/api/v1/contacts/${params.id}`, headers: headers});

  const submit=(event)=> {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    put(`/api/v1/contacts/${data.id}`, {"contact": {"name": name, "phone": phone}}, {headers: headers})
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        alert(ErrorParser(error.response.data));
      });
  };
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          { data && <ContactForm action={submit} contact={data} /> }
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="outline-secondary" href="/" className="mx-2 my-4">Back to contact list</Button>
        </Col>
      </Row>
    </Container>
  );
}
export default EditContact;
