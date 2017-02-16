## Fingerpost

### Usage

#### CLI

```console
$ fingerpost --url http://petstore.swagger.io/v2/swagger.json --template ./path/to/tmeplates
```

#### API

```js
import Fingerpost from 'fingerpost';

let fingerpost = new Fingerpost({
  url: "http://petstore.swagger.io/v2/swagger.json",
  template: "./path/to/tmeplates"
});

fingerpost.dump('/path/to/output');
```
