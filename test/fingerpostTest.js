import Fingerpost from '../src/lib/fingerpost';
import {expect} from 'chai';
import path from 'path';
import rimraf from 'rimraf';
import fs from 'fs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Fingerpost', () => {
  describe('#dump', () => {
    let fingerpost;
    let axiosMock = new MockAdapter(axios);
    let url = 'https://example.com/a.json';
    let src = path.join(__dirname, 'fixtures');
    let dest = path.join('/', 'tmp', 'fp');

    beforeEach(() => {
      rimraf.sync(dest);
      fingerpost = new Fingerpost({url, src, dest});
    });

    it('applies fetched data to handlebars templates', (done) => {
      axiosMock.onGet(url).reply(200, {
        a: 'aaa',
        b: {c: 'ccc'}
      });

      fingerpost.dump().then(() => {
        expect(fs.readFileSync(path.join(dest, 'a.txt'), 'utf8')).to.contain('aaa');
        expect(fs.readFileSync(path.join(dest, 'a', 'b.txt'), 'utf8')).to.contain('ccc');

        done();
      });
    });
  });
});
