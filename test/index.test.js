const assert = require('assert')
const axios = require('axios')
const app = require('../app')
let server
let baseUrl = 'http://localhost:3100'

describe('first test suite', function () {
    before(function() {
        // start server on different port
        server = app.listen(3100)
        console.log('Listening on port 3100 for testing...')
    });

    after(function() {
        // close server
        server.close()
    });

    it('app boots up', async function () {        
        const res = await axios.get(baseUrl)
        assert.deepStrictEqual(res.data, { say: 'Hello World using Nodemon'})
    })

    it('sends 500 when posting to /write w/o credentials', async function () {
        try {
            const res = await axios.post(baseUrl + '/write')        
        } catch (err) {            
            assert.strictEqual(err.response.status, 500)
        }
    })
})