const http = require('http');
const url = require('url');
const query = require('querystring');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

const contentHandler = require('./contentHandler');
const dataHandler = require('./dataHandler');

const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const params = query.parse(parsedUrl.query);
  switch (parsedUrl.pathname) {
    case '/': { contentHandler.getIndex(res); break; }
    case '/favicon.ico': { contentHandler.getFavIcon(res); break; }
    case '/style.css': { contentHandler.getCss(res); break; }
    case '/success': { dataHandler.success('This is a successful response')(req, res); break; }
    case '/badRequest': { dataHandler.badReq(req, res)(params); break; }
    case '/unauthorized': { dataHandler.unauthReq(req, res)(params); break; }
    case '/forbidden': { dataHandler.forbiddenReq(req, res); break; }
    case '/internal': { dataHandler.internalError(req, res); break; }
    case '/notImplemented': { dataHandler.notImplemented(req, res); break; }
    default: { dataHandler.notFound(req, res); break; }
  }
  res.end();
};

http.createServer(onRequest).listen(PORT, () => {
  console.dir(`Server listening at 127.0.0.1:${PORT}`);
});
