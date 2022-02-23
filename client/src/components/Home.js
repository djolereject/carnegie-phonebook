import React from "react";
import { Row, Col } from 'react-bootstrap';

const Home=({logged})=> {
  return (
    <Row>
      <Col>
      Home page for { logged ? "Logged" : "Unlogged"} user
      </Col>
    </Row>
  )
}
export default Home;
