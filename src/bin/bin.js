#!/usr/bin/env node

import commander from 'commander';
import Fingerpost from '../lib/fingerpost';

commander
  .option('-u, --url <url>', 'json URL')
  .option('-s, --src <dir>', 'path to src template directory')
  .option('-d, --dest <dir>', 'path to output directory')
  .parse(process.argv);

let fingerpost = new Fingerpost({
  url: commander.url,
  src: commander.src,
  dest: commander.dest
});

fingerpost.dump();
