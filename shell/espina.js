#! /usr/bin/env node
var argv = require('yargs')
	.commandDir('./cmds')
	.completion()
	.demand(1)
	.help()
	.argv
