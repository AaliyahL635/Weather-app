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
    if (index < 6) {
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
<div class="forecast-temperature"><span class="forecast-temperature-max">${Math.round(
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
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response);
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.temperature.current;
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

function searchCity(city) {
  let apiKey = "e060f7b7t14cca4123801e32a3d6adob";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempElement");
  unitSwitchEnabled = !unitSwitchEnabled;

  if (unitSwitchEnabled) {
    let fahrenheitConversion = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitConversion);
  } else {
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempElement");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let unitSwitchEnabled = false;

let forecastConversion = document.querySelector("#");

let celsiusLink = document.querySelector("#tempElement");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitConversion = document.querySelector("#tempSwitch");
fahrenheitConversion.addEventListener("change", displayFahrenheitTemp);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Milan");
