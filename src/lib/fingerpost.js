import axios from 'axios';

class Fingerpost {
  constructor(url) {
    this.url = url;
  }

  fetch() {
    axios.get(this.url).then(res => {
      console.log(res.data);
    });
  }
}

export default Fingerpost;
