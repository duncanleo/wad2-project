import express from 'express';

const app = express();

app.get('/', function (req, res) {
  res.send('Hello world');
});

const { PORT } = process.env;

let port = 5000;

if (PORT != null) {
  try {
    port = parseInt(PORT, 10);
  } catch (e) {}
}

console.log(`Starting backend on port ${port}`);

app.listen(port);
