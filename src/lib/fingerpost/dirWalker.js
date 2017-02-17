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
        let content = opts.transform(src);
        fs.writeFileSync(dest, content);
      } else {
        fs.linkSync(src, dest);
      }
    }
  }
}

export default DirWalker;
