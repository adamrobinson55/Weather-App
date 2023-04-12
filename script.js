//Variables
var input = document.getElementById("myInput")
var button = document.getElementById("myButton")
var fillableUl = document.getElementById("fillThisUl")



var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' //NUMBER&lon=NUMBER
//function to convert city name to lat and lon
//
function displayWeather(weather, temp, humid, wind) {

}

function cityConverter(lat, lon) {
    console.log(lat + "    " + lon)
    var apiUrl1 = weatherUrl + lat + '&lon=' + lon + '&units=imperial&appid=3cdf79fc5dc80cce3a241da69c9d15b7'
    fetch(apiUrl1)
        .then(function(response) {
            return response.json()})
        .then(function(data){
            console.log(data)
            var weatherData = data.list[0].weather[0].icon
            var tempData = data.list[0].main.temp
            var humidData = data.list[0].main.humidity
            var windData = data.list[0].wind.speed
            var dateData = data.list[0].dt_txt
            console.log(weatherData+"   "+tempData+"   "+humidData+"   "+windData+"   "+dateData)

        })
}

function latlonConverter() {
    var city = input.value
    if(city == ""){return}
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=19f40dc73d00c4ecaf74bc0afa4dd390'
    fetch(apiUrl)
        .then(function(response){
            return response.json()})
        .then(function(data){
            console.log(data)
            var lat = data[0].lat
            var lon = data[0].lon
            cityConverter(lat, lon)
        })
}

//save city name to local storage



button.addEventListener('click', latlonConverter)