import React from "react";

const ErrorParser=(error)=> {
  const nameErrors = error.name && error.name.map((k, v)=> "Name ".concat(k)) || []
  const phoneErrors = error.phone && error.phone.map((k, v)=> "Phone ".concat(k)) || []
  return nameErrors.concat(phoneErrors);
};
export default ErrorParser;
