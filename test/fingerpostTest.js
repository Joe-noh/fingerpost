import Fingerpost from '../src/lib/fingerpost';
import {expect} from 'chai';

describe('Fingerpost', () => {
  describe('#constructor', () => {
    let fingerpost;
    let url = 'https://example.com/a.json';
    let template = './path/to/template';

    beforeEach(() => {
      fingerpost = new Fingerpost({url, template});
    });

    it('should have member `url`', () => {
      expect(fingerpost.url).to.equal(url);
    });

    it('should have member `template`', () => {
      expect(fingerpost.template).to.equal(template);
    });
  });
});
