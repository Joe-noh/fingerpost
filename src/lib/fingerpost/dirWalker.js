import path from 'path';
import fs from 'fs';;

class DirWalker {
  constructor() {}

  copy(src, dest, opts = {}) {
    if (!fs.existsSync(src)) { return; }

    let stats = fs.statSync(src);
    if (stats.isDirectory()) {
      fs.mkdirSync(dest);

      let files = fs.readdirSync(src);
      files.forEach(file => {
        this.copy(path.join(src, file), path.join(dest, file), opts);
      });
    } else {
      if (opts.only && !opts.only(src)) { return; }

      if (opts.transform) {
        if (opts.transformIf) {
          this.conditionallyTransform(src, dest, opts);
        } else {
          fs.writeFileSync(dest, opts.transform(src));
        }
      } else {
        fs.linkSync(src, dest);
      }
    }
  }

  conditionallyTransform(src, dest, opts) {
    if (opts.transformIf(src)) {
      fs.writeFileSync(dest, opts.transform(src));
    } else {
      fs.linkSync(src, dest);
    }
  }
}

export default DirWalker;
