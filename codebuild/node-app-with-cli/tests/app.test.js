const test = require('tape')
const app = require('../app')
const request = require('supertest')


test('The home route returns 200', t => {
    request(app)
        .get('/')
        .expect('Content-Type', /text/)
        .expect(200)
        .end(err => {
            if (err) return t.end(err)
            t.end()
        })
})

test('The pizza route returns json', t => {
    request(app)
        .get('/pizzas')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) return t.end(err)
            t.end()
        })
})