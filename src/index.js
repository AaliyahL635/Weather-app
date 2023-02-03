let weather = {
  paris: {
    city: "Paris",
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    city: "Tokyo",
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    city: "Lisbon",
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    city: "San Francisco",
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    city: "Oslo",
    temp: -5,
    humidity: 20,
  },
};

// write your code here
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="WeatherForecast row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
<div class="WeatherForecastPreview">
<div class="forecast-time">${formatDay(forecastDay.time)}</div><img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt="forecast"
          
        />
<div class="forecast-temperature" id=conversion><span class="forecast-temperature-max">${Math.round(
          forecastDay.temperature.maximum
        )}° / </span><span class="forecast-temperature-min">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
</div>
</div>
</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "e060f7b7t14cca4123801e32a3d6adob";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${globalUnit}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response);
  let iconElement = document.querySelector("#icon");
  baseTemperature = response.data.temperature.current;
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#tempElement").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#currentFeel").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#currentDate").innerHTML = formatDate(
    response.data.time * 1000
  );
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.coordinates);
}

function searchLocation(position) {
  let apiKey = "e060f7b7t14cca4123801e32a3d6adob";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=${globalUnit}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(city) {
  let apiKey = "e060f7b7t14cca4123801e32a3d6adob";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${globalUnit}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function unitConvertTemp(event) {
  event.preventDefault();
  let currentSwitchPosition = document.querySelector("#tempSwitch").value;
  let temperatureElement = document.querySelector("#tempElement");
  if (currentSwitchPosition === "on") {
    if (globalUnit === "metric") {
      let fahrenheitConversion = (baseTemperature * 9) / 5 + 32;
      temperatureElement.innerHTML = Math.round(fahrenheitConversion);
      baseTemperature = fahrenheitConversion;
    } else {
      temperatureElement.innerHTML = Math.round(baseTemperature);
    }
    globalUnit = "imperial";
    document.querySelector("#tempSwitch").value = "off";
  } else {
    if (globalUnit === "imperial") {
      let fahrenheitConversion = ((baseTemperature - 32) * 5) / 9;
      temperatureElement.innerHTML = Math.round(fahrenheitConversion);
      baseTemperature = fahrenheitConversion;
    } else {
      temperatureElement.innerHTML = Math.round(baseTemperature);
    }
    globalUnit = "metric";
    document.querySelector("#tempSwitch").value = "on";
  }
}

let baseTemperature = null;
let globalUnit = "metric";

let fahrenheitConversion = document.querySelector("#tempSwitch");
fahrenheitConversion.addEventListener("change", unitConvertTemp);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Milan");
