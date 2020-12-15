function tempConvertor(temp) {
    temp = parseInt(temp - 273.15)
    return temp
}/* kelvin to celcius */
var date = new Date();
var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "satureday"]
document.getElementById('day').innerHTML = days[date.getDay()];
document.getElementById('exact-time').innerHTML = date.getHours() + ":" + date.getMinutes();

document.getElementById('searchBtn').addEventListener('click', getWeatherDetails)
function getWeatherDetails() {
    var cityName = document.getElementById('searchInput').value;
    var serverUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=1a93b4864cfb5f78cc5a39c3994df7ca";
    fetch(serverUrl)
        .then(response => response.json())
        .then(json => {
            var cityName = json.name;
            document.querySelector('.city-name').innerHTML = cityName;
            var feelsLikeTemperature = json.main.feels_like;
            feelsLikeTemperature = tempConvertor(feelsLikeTemperature);
            document.querySelector('.feels').innerHTML = feelsLikeTemperature;
            var minimumTemperature = json.main.temp_min;
            minimumTemperature = tempConvertor(minimumTemperature);
            document.querySelector('.min').innerHTML = minimumTemperature;
            var maximumTemperature = json.main.temp_max;
            maximumTemperature = tempConvertor(maximumTemperature);
            document.querySelector('.max').innerHTML = maximumTemperature;
            var temperature = json.main.temp;
            temperature = tempConvertor(temperature);
            document.querySelector('.current-temp').innerHTML = temperature;
            var weatherCondition = json.weather[0].description;
            document.querySelector('h1').innerHTML = weatherCondition;
            var imageUrl = json.weather[0].icon;
            document.getElementById('tempImg').src = './assets/img/' + imageUrl + '.svg';
        })
        .catch(errorHandler)
};
function errorHandler(event){
    alert('enter a city name')
}