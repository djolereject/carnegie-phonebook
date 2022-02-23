import React from "react";
import { Row, Col } from 'react-bootstrap';

import ContactCreator from './contacts/ContactCreator';
import ContactList from './contacts/ContactList';

const Home=({headers, alert})=> {
  return (
    <Row>
      <Col>
        <h1 className="my-4">Contacts</h1>
        <ContactCreator headers={headers} alert={alert} />
        <ContactList headers={headers} alert={alert} />
      </Col>
    </Row>
  )
}
export default Home;
