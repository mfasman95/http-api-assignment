const xmlMime = 'text/xml';
const jsonMime = 'application/json';

const responseHeader = (accepts) => {
  if (accepts.indexOf(xmlMime) !== -1) return xmlMime;
  return jsonMime;
};

const respondJson = status => object => (req, res) => {
  const accepts = req.headers.accept;
  const contentType = responseHeader(accepts);
  res.writeHead(status, { 'Content-Type': contentType });
  if (contentType === xmlMime) {
    res.write(`
      <response>
        <message>${object.message || 'No Message'}</message>
        <id>${object.id || 'No ID'}</id>
      </response>
    `);
  } else res.write(JSON.stringify(object));
  res.end();
};

const success = message => (req, res) => respondJson(200)({ message })(req, res);

const badReq = (req, res) => (params) => {
  if (!params.valid || params.valid !== 'true') {
    return respondJson(400)({
      message: 'Missing valid query parameter set to true',
      id: 'badRequest',
    })(req, res);
  }
  return success('This request has the required parameters')(req, res);
};

const notFound = (req, res) => respondJson(404)(Object.freeze({
  message: 'The page you are looking for was not found',
  id: 'notFound',
}))(req, res);

const unauthReq = (req, res) => (params) => {
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    return respondJson(401)({
      message: 'Missing loggedIn query parameter set to yes',
      id: 'unauthorized',
    })(req, res);
  }
  return success('You have successfully viewed the content')(req, res);
};

const forbiddenReq = (req, res) => respondJson(403)({
  message: 'You do not have access to this content',
  id: 'forbidden',
})(req, res);

const internalError = (req, res) => respondJson(500)({
  message: 'Internal server Error, something went wrong',
  id: 'internalError',
})(req, res);

const notImplemented = (req, res) => respondJson(403)({
  message: 'A get request for this page has not been implemented yet, check again later for updated content',
  id: 'notImplemented',
})(req, res);

module.exports = Object.freeze({
  success,
  badReq,
  notFound,
  unauthReq,
  forbiddenReq,
  internalError,
  notImplemented,
});
