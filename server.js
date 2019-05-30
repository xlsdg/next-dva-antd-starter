const Next = require('next');
const Express = require('express');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = Next({
  dev,
  dir: './src',
  // quiet: false,
  // conf: {},
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = Express();

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) {
      throw err;
    }

    console.log(`> Ready on http://localhost:${port}`);
  });
});
