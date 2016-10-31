#! /usr/bin/env node
const argv = require('yargs')
	.commandDir('./cmds')
	.completion()
	.demand(1)
	.help()
	.argv;
