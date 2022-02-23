import React from "react";
import { Alert as BootstrapAlert, Row, Col } from 'react-bootstrap';

const Alert=({messages})=> {
  return (
    <BootstrapAlert variant="danger">
      { messages.map((item, index)=> {
        return (
          <Row key={index}>
            <Col className="text-center"> { item } </Col>
          </Row>
        );
      })}
    </BootstrapAlert>
  );
};
export default Alert;
