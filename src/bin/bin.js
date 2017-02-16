#!/usr/bin/env node

import commander from 'commander';
import Fingerpost from '../lib/fingerpost';

commander
  .option('-u, --url <url>', 'json URL')
  .option('-t, --template <dir>', 'path to template directory')
  .parse(process.argv);

let fingerpost = new Fingerpost({
  url: commander.url,
  template: commander.template
});

fingerpost.dump('./');
