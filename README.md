## Fingerpost

### Usage

#### CLI

```console
$ fingerpost --url http://petstore.swagger.io/v2/swagger.json --src ./path/to/templates --dest /path/to/output
```

#### API

```js
import Fingerpost from 'fingerpost';

let fingerpost = new Fingerpost({
  url: 'http://petstore.swagger.io/v2/swagger.json',
  src: './path/to/templates',
  dest: './path/to/output'
});

fingerpost.dump();
//=> returns promise
```
