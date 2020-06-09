const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Benin City&appid=a2aff84845f89e61d6d247457132c6c2&units=metric";

//use native node http to make get request from the API

https.get(url,function(response){

console.log(response.statusCode);

response.on("data", function(data){
  const weatherData = JSON.parse(data);
    const weatherDescription = weatherData.weather[0].description;
    const temp = weatherData.main.temp;


      res.write("<p> The weather is currently " +weatherDescription+". </p>");
    res.write("<h1>The current temperature in Benin City is " + temp + " degree Celcius.</h1>");
      res.send();
})

})

});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
