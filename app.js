const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();



const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){


const cityName = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "imperial";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+ apiKey +"&units="+ unit;

https.get(url, function(response){
  console.log(response.statusCode);

  response.on("data", function(data){
    const WeatherData = JSON.parse(data);

    const temp = WeatherData.main.temp;
    const Weatherdescription = WeatherData.weather[0].description;
    const icon = WeatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
    res.write("<p>The Weather is currently " + Weatherdescription +".</p>")
    res.write("<h1>The temperature in "+ cityName +" is " + temp + " degrees Fahrenheit.</h1>")
    res.write("<img src="+ imageURL +">")
    res.send()
  })
})

})



app.listen(3000, function(){
  console.log("Our server started at port 3000.");
});
