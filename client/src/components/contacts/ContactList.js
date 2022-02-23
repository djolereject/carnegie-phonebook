import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import useAxios from "axios-hooks";

const ContactList=({headers, alert})=> {
  const [{ data, loading, error }, refetch] = useAxios({url: "/api/v1/contacts", headers: headers});

  useEffect(()=>{
    if(error) { alert(error.response.data.errors) }
  }, [error])

  return (
    <Table striped bordered hover className="my-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        { data && data.length > 0 && data.map((item, index)=> {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{ item.name }</td>
              <td>{ item.phone }</td>
              <td>actions</td>
            </tr>
          ); })}
      </tbody>
    </Table>
  );
}
export default ContactList;
