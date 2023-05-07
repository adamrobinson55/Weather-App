//Variables
var input = document.getElementById("myInput")
var button = document.getElementById("myButton")
var fillableUl = document.getElementById("fillThisUl")
var weatherDisplay = document.getElementById("weatherdisplay")
var localArray = []

var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' //NUMBER&lon=NUMBER

function cityConverter(lat, lon) {
    var apiUrl1 = weatherUrl + lat + '&lon=' + lon + '&units=imperial&appid=3cdf79fc5dc80cce3a241da69c9d15b7'
    fetch(apiUrl1)
        .then(function(response) {
            return response.json()})
        .then(function(data){
            while(weatherDisplay.firstChild){
                weatherDisplay.removeChild(weatherDisplay.firstChild)
            }
            for(i=0;i<5; i++){
                //Make Elements
                var tempLi = document.createElement('li')
                var tempIcon = document.createElement('img')
                var tempDataDisplay = document.createElement('span')
                //Get Data
                var weatherData = data.list[i].weather[0].icon
                var tempData = data.list[i].main.temp
                var humidData = data.list[i].main.humidity
                var windData = data.list[i].wind.speed
                var dateData = data.list[i].dt_txt
                //Apply Data to Elements
                tempIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+weatherData+'@2x.png')
                tempDataDisplay.textContent =  "   Temperature: " + tempData + "   Humidity:" + humidData + " Wind Speed:"
                + windData + " Date:  " + dateData
                //Apply Tailwind Classes to Elements
                tempLi.setAttribute('class', 'flex align-items-center z-1 border-2 text-xl')
                //Add Elements to display
                tempLi.appendChild(tempIcon)
                tempLi.appendChild(tempDataDisplay)
                weatherDisplay.appendChild(tempLi)
            }
        })
}

function latlonConverter(city) {
    if(input.value != ''){
        console.log(input.value)
        city = input.value
        saveToLocalStorage(city)
        var liEl = document.createElement('li')
        input.value = ""
        liEl.textContent = city
        liEl.setAttribute('id', 'searched')
        fillableUl.appendChild(liEl)
    }
    city = city
    if(city == ""){return}
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=19f40dc73d00c4ecaf74bc0afa4dd390'
    fetch(apiUrl)
        .then(function(response){
            return response.json()})
        .then(function(data){
            var lat = data[0].lat
            var lon = data[0].lon
            cityConverter(lat, lon)
        })
}

function saveToLocalStorage(x) {
    localArray.push(x)
    console.log(localArray)
    localStorage.setItem("cityHistory", JSON.stringify(localArray))
}

function initLoadLocalStorage(){
    if(localStorage.getItem("cityHistory")) {
        var tempArray = JSON.parse(localStorage.getItem("cityHistory"))
        localArray = tempArray
        for(i=0; i<tempArray.length; i++){
            var liEl = document.createElement('li')
            liEl.setAttribute('id', 'searched')
            liEl.textContent = tempArray[i]
            fillableUl.appendChild(liEl)
        }
    }
}

initLoadLocalStorage()

document.addEventListener('click', function(e){
    if(e.target.id == 'searched'){
        console.log(e.target.textContent)
        latlonConverter(e.target.textContent)
    }
})
button.addEventListener('click', latlonConverter)