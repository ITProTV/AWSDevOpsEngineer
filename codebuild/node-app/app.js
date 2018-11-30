const express = require('express')
const app = express()
const logger = require('morgan')


app.use(logger('dev'))

app.get('/', (req, res) => {
    res.status(200)
    res.send('Working...')
})

app.get('/pizzas', (req, res) => {
    res.status(200)
    res.json({
        pizzas: [
            {
                type: 'pepperoni', 
                size: 'large'
            },
            {
                type: 'meat lovers',
                size: 'xlarge'
            },
            {
                type: 'buffalo chicken',
                size: 'medium'
            }
        ]
    })
})




module.exports = app