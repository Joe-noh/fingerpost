import fs from 'fs';
import axios from 'axios';
import Handlebars from 'handlebars';
import DirWalker from './fingerpost/dirWalker';

class Fingerpost {
  constructor(opts) {
    this.url = opts.url;
    this.src = opts.src;
    this.dest = opts.dest;

    this.walker = new DirWalker();
  }

  dump() {
    return axios.get(this.url).then(res => {
      this.walker.copy(this.src, this.dest, {
        transform: this.applyHandlebars(res.data)
      });
    });
  }

  applyHandlebars(data) {
    return (src) => {
      let template = Handlebars.compile(fs.readFileSync(src, 'utf8'));
      return template(data);
    };
  }
}

export default Fingerpost;
