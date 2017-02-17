import DirWalker from '../src/lib/fingerpost/dirWalker';
import {expect} from 'chai';
import rimraf from 'rimraf';
import fs from 'fs';
import path from 'path';

describe('DirWalker', () => {
  let walker;
  let src = path.join(__dirname, 'fixtures');
  let dest = path.join('/', 'tmp', 'fp');

  beforeEach(() => {
    walker = new DirWalker();
  });

  describe('#copy', () => {
    beforeEach(() => {
      rimraf.sync(dest);
    });

    it('copies files keeping directory structure', () => {
      walker.copy(src, dest);

      expect(fs.existsSync(path.join(dest, 'a'))).to.eql(true);
      expect(fs.existsSync(path.join(dest, 'a.txt'))).to.eql(true);
      expect(fs.existsSync(path.join(dest, 'a', 'b.txt'))).to.eql(true);
    });

    it('transforms file content', () => {
      walker.copy(src, dest, {transform: (src => 'hey')});

      expect(fs.readFileSync(path.join(dest, 'a.txt'), 'utf8')).to.eql('hey');
      expect(fs.readFileSync(path.join(dest, 'a', 'b.txt'), 'utf8')).to.eql('hey');
    });

    it('copies only the condition met', () => {
      walker.copy(src, dest, {only: (src => path.basename(src) == 'b.txt')});

      expect(fs.existsSync(path.join(dest, 'a'))).to.eql(true);
      expect(fs.existsSync(path.join(dest, 'a.txt'))).to.eql(false);
      expect(fs.existsSync(path.join(dest, 'a', 'b.txt'))).to.eql(true);
    });

    it('transforms if transformIf be true', () => {
      walker.copy(src, dest, {
        transform: (src => 'hey'),
        transformIf: (src => path.basename(src) == 'b.txt')
      });

      expect(fs.readFileSync(path.join(dest, 'a.txt'), 'utf8')).not.to.eql('hey');
      expect(fs.readFileSync(path.join(dest, 'a', 'b.txt'), 'utf8')).to.eql('hey');

    })
  });
});
