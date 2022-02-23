import React, { useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import useAxios from "axios-hooks";
import axios from 'axios';
import ErrorParser from './ErrorParser';

const ContactList=({headers, alert})=> {
  const [{ data, error }] = useAxios({url: "/api/v1/contacts", headers: headers});

  useEffect(()=>{
    if(error) { alert(error.response.data.errors) }
  }, [error, alert])

  const deleteItem=(item)=> {
    if(window.confirm('Are you sure?')) {

      axios.delete(`/api/v1/contacts/${item.id}`, {headers: headers})
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          alert(ErrorParser(error.response.data));
        });
    }
  };

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
              <td className="col-3">
                <Button variant="primary" href={`/contacts/${item.id}`} className="mx-3">Edit</Button>
                <Button variant="danger" onClick={()=>deleteItem(item)}>Delete</Button>
              </td>
            </tr>
          ); })}
      </tbody>
    </Table>
  );
}
export default ContactList;
