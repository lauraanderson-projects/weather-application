function apiKeyURL(cityname) {
  //let city = cityname;
  let apiKey = "bd809658a5b50o74b7f3fe9fa5dft8a8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityname}&key=${apiKey}&units=imperial`;
  return apiUrl;
}

function formatDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayTempertureEvent(response) {
  //get responses
  let city = response.data.city;
  let date = new Date(response.data.time * 1000);
  let condition = response.data.condition.description;
  let temperature = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let icon = response.data.condition.icon_url;
  let degree = "&deg;F";
  //get elements
  let temperatureElement = document.querySelector("#city-name-heading");
  let currentTimeElement = document.querySelector("#current-time");
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let weatherConditionElement = document.querySelector("#weather-condition");
  let currentTempElement = document.querySelector("#current-weather-temp");
  let iconElement = document.querySelector("#current-weather-icon");
  let currentWeatherDegree = document.querySelector("#current-weather-degree");
  //set elements
  temperatureElement.innerHTML = city;
  currentTimeElement.innerHTML = formatDate(date);
  weatherDescriptionElement.innerHTML = `, ${condition}`;
  weatherConditionElement.innerHTML = `Humidity: <strong>${humidity}%</strong>, Wind:
                <strong>${wind}km/h</strong>`;
  currentTempElement.innerHTML = temperature;
  currentWeatherDegree.innerHTML = degree;
  iconElement.innerHTML = `<img src="${icon}" class="current-weather-icon" />`;

  getForecast(response.data.city);
}

function getCitySearch(event) {
  event.preventDefault();
  //get city name trim the city name
  let city = document.querySelector("#cityName");
  city = city.value.trim();
  //api information for temp search
  let apiUrl = apiKeyURL(city);
  axios.get(apiUrl).then(displayTempertureEvent);

  //if (city) {
  //  h1.innerHTML = `${city}`;
  //  currentTime.innerHTML = `${day}`;

  // } else {
  //   alert("Enter a city");
  // }
}

function setInitialCity() {
  let city = "Seattle";
  //api information for temp search
  let apiUrl = apiKeyURL(city);
  axios.get(apiUrl).then(displayTempertureEvent);
}

function getForecast(city) {
  let apiKey = "bd809658a5b50o74b7f3fe9fa5dft8a8";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      let icon = day.condition.icon_url;
      forecastHTML =
        forecastHTML +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div class=""><img src="${icon}" class="weather-forecast-icon" /></div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}&deg;C</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}&deg;C</div>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

setInitialCity();

let citySearch = document.querySelector("#citySearch");
citySearch.addEventListener("submit", getCitySearch);
