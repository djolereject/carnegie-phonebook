import React from "react";

const HeaderParser=(header)=> {
  return {
    'uid': header['uid'],
    'client': header['client'],
    'access-token': header['access-token'],
    'token-type': header['token-type'],
    'Content-Type': 'application/json'
  }
};
export default HeaderParser;
