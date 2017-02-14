#!/usr/bin/env node

import commander from 'commander';
import Fingerpost from '../lib/fingerpost';

commander
  .option('-u, --url <url>', 'json URL')
  .parse(process.argv);

let fingerpost = new Fingerpost(commander.url);

fingerpost.fetch();
