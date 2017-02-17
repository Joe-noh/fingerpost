import axios from 'axios';
import gulp from 'gulp';
import hb from 'gulp-hb';
import path from 'path';

class Fingerpost {
  constructor(opts) {
    this.url = opts.url;
    this.src = opts.src;
    this.dest = opts.dest;
  }

  dump() {
    axios.get(this.url).then(res => {
      let transform = hb().data(res.data);

      gulp.src(path.join(this.src, '**', '*'))
        .pipe(transform)
        .pipe(gulp.dest(this.dest));
    }).catch(e => {
      console.log(e);
    });
  }
}

export default Fingerpost;
