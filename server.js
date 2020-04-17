const express = require('express')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const request = require('request');


// setup server
const app = express()
app.use(express.json())
app.use(cors())

// read .env file
dotenv.config()

// read and parse .env.local file
try {
    const localConfig = dotenv.parse(fs.readFileSync('.env'))
    process.env = {
        ...process.env,
        ...localConfig,
    }
} catch (error) { }

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/where-to-find-gold'));

app.get('/gold-places/:latitude/:longitude/:radius', (req, res) => {

    const latitude = req.params.latitude
    const longitude = req.params.longitude
    const radius = req.params.radius

    request(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}000&keyword=goldhaendler&name=gold&key=${process.env.API_KEY}`, function (error, response, body) {

        if (Object.keys(body).length > 0) {
            res.send(body)
        } else {
            res.send()
        }
    });
})

// catch all handler for client deeplinks

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/where-to-find-gold/index.html'));
});

app.listen(process.env.PORT || 8080)


