#! /usr/bin/env node
/* eslint no-unused-expressions: 0*/
require('yargs')
.commandDir('./cmds')
.completion()
.demand(1)
.help()
.argv;
