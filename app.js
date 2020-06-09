const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");

});


app.post("/", function(req, res){

const query= req.body.cityName;
const apiKey="a2aff84845f89e61d6d247457132c6c2";
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+"&appid="+apiKey+"&units="+units+"";

//use native node http to make get request from the API

https.get(url,function(response){

console.log(response.statusCode);

response.on("data", function(data){
const weatherData = JSON.parse(data);
  const weatherDescription = weatherData.weather[0].description;
  const temp = weatherData.main.temp;
  const icon =weatherData.weather[0].icon;
  const imageUrl = "http://openweathermap.org/img/wn/"+icon+ "@2x.png";

    res.write("<p> The weather is currently " +weatherDescription+". </p>");
  res.write("<h1>The current temperature in "+query+" is " + temp + " degree Celcius.</h1>");
  res.write("<img src="+imageUrl+">");
    res.send();
})

})


console.log("Post request received!");
})


app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
