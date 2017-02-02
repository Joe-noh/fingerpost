const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const serialize = require('serialize-javascript');
const resolve = (file => path.resolve(__dirname, file));

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

let renderer, indexHTML;

if (isProduction) {
  renderer = createRenderer(fs.readFileSync(resolve('./dist/server-bundle.js'), 'utf-8'));
  indexHTML = parseIndex(fs.readFileSync(resolve('./dist/index.html'), 'utf-8'));
} else {
  const devServer = require('./build/setup-dev-server');

  devServer(app, {
    bundleUpdated: bundle => {
      renderer = createRenderer(bundle);
    },
    indexUpdated: index => {
      indexHTML = parseIndex(index);
    }
  });
}

function createRenderer(bundle) {
  const renderer = require('vue-server-renderer');
  const cache = require('lru-cache');

  return renderer.createBundleRenderer(bundle, {
    cache: cache({max: 1000, maxAge: 1000 * 60 * 20})
  });
}

function parseIndex(template) {
  const contentMarker = '<!-- APP -->';
  const index = template.indexOf(contentMarker);

  return {
    head: template.slice(0, index),
    tail: template.slice(index + contentMarker.length)
  };
}

const serve = (path, cache) => {
  return express.static(resolve(path), {
    maxAge: (cache && isProduction) ? 60 * 60 * 24 * 30 : 0
  });
}

app.use(compression({threshold: 0}));
// app.use(favicon('./public/favicon.ico'));
// app.use('/service-worker.js', serve('./dist/service-worker.js'));
// app.use('/manifest.json', serve('./manifest.json'));
app.use('/dist', serve('./dist'));
app.use('/public', serve('./public'));

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation');
  }

  res.setHeader('Content-Type', 'text/html');

  const context = {url: req.url};
  const renderStream = renderer.renderToStream(context);

  renderStream.once('data', () => {
    res.write(indexHTML.head);
  });

  renderStream.on('data', chunk => {
    res.write(chunk);
  });

  renderStream.on('end', () => {
    if (context.initialState) {
      const serialized = serialize(context.initialState, {isJSON: true});
      res.write(`<script>window.__INITIAL_STATE__=${serialized}</script>`);
    }
    res.end(indexHTML.tail);
  });

  renderStream.on('error', err => {
    if (err && err.code === '404') {
      res.status(404).end('Not Found');
    } else {
      res.status(500).end('Server Error');
    }

    console.error(err);
  });
});

const port = process.env.PORT || 9090;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
