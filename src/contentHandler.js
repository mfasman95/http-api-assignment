const fs = require('fs');
const path = require('path');

const index = fs.readFileSync(path.join(__dirname, './../client/client.html'));
const css = fs.readFileSync(path.join(__dirname, './../client/style.css'));
const icon = fs.readFileSync(path.join(__dirname, './../client/favicon.ico'));

module.exports = Object.freeze({
  getIndex: (res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(index);
    res.end();
  },
  getCss: (res) => {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.write(css);
    res.end();
  },
  getFavIcon: (res) => {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    res.write(icon);
    res.end();
  },
});
