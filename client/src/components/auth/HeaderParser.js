

const HeaderParser=(header)=> {
  return {
    'uid': header['uid'],
    'client': header['client'],
    'access-token': header['access-token'],
    'token-type': header['token-type'],
    'expiry': header['expiry']
  }
};
export default HeaderParser;
