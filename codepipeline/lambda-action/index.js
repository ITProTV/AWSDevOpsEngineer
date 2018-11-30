const { handler } = require('./lib')
const event = require('./event.json')

const ctx = { data: [], errors: [] }
ctx.done = (...args) => ctx.data.push(...args)
ctx.fail = (...args) => ctx.errors.push(...args)
const writeJSON = method => 
		  (...args) => 
		  console[method](args.map(JSON.stringify).join('\n'))

const log = writeJSON('log')
const logErr = writeJSON('error')

handler(event, ctx)
	.then(data => log({ data, ctx }))
	.catch(err => logErr({ err, ctx }))

