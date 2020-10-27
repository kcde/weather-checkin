// const { request } = require('express');
// const { response } = require('express');
require("dotenv").config()
console.log(process.env)
const fetch = require("node-fetch")
const express = require('express');
const Datastore = require('nedb');
const app = express();
const database = new Datastore('database.db')
database.loadDatabase();
const apiKey = process.env.apikey;

app.listen(3000, ()=> console.log('listening at 3000'));
// to serve up a webpage
app.use(express.static("public"));
app.use(express.json());

app.post('/api', function(req, res){
    const timestamp = Date.now();
    data = req.body;
    data.timestamp = timestamp;
   database.insert(data)
    res.json(data)

})
app.get('/api', function(req, res){
    database.find({},(err,data)=>{
        if(err){
            res.end();
            return
        }
        res.json(data)
    })
})




        app.get(`/weather/:latlon`, async (req,res)=>{
            const latlon = req.params.latlon.split(",");
            console.log(latlon);
            const lat = latlon[0];
            const lon = latlon[1];
            const weather_url =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
            const weather_response = await fetch(weather_url)
            const weather_json = await weather_response.json();
            

            const aq_url =`https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`
            const aq_response = await fetch(aq_url)
            const aq_json = await aq_response.json();

            const data = {
                weather : weather_json,
                air_quality: aq_json
        }
            res.json( data)
        })
