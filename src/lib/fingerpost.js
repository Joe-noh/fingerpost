import axios from 'axios';

class Fingerpost {
  constructor(opts) {
    this.url = opts.url;
    this.template = opts.template;
  }

  dump(_path) {
    axios.get(this.url).then(res => {
      console.log(res.data);
    });
  }
}

export default Fingerpost;
