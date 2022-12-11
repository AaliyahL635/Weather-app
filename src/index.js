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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thur", "Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class="WeatherForecast row">`;
  
  days.forEach(function (day) {
  forecastHTML =
    forecastHTML +
    `<div class="col">
<div class="WeatherForecastPreview">
<div class="forecast-time">${day}</div><canvas width="38" height="38"></canvas>
<div class="forecast-temperature"><span class="forecast-temperature-max">11°</span><span class="forecast-temperature-min">8°</span>
</div>
</div>
</div>
<div class="col">
  <div class="WeatherForecastPreview">
    <div class="forecast-time">${day}</div>
    <canvas width="38" height="38"></canvas>
    <div class="forecast-temperature"><span class="forecast-temperature-max">10°</span><span class="forecast-temperature-min">6°</span>
    </div>
  </div>
</div>
<div class="col">
  <div class="WeatherForecastPreview">
    <div class="forecast-time">${day}</div>
    <canvas width="38" height="38"></canvas>
    <div class="forecast-temperature"><span class="forecast-temperature-max">10°</span><span class="forecast-temperature-min">7°</span>
    </div>
  </div>
</div>
<div class="col">
  <div class="WeatherForecastPreview">
    <div class="forecast-time">${day}</div>
    <canvas width="38" height="38"></canvas>
    <div class="forecast-temperature"><span class="forecast-temperature-max">10°</span><span class="forecast-temperature-min">7°</span>
    </div>
  </div>
</div>
<div class="col">
  <div class="WeatherForecastPreview">
    <div class="forecast-time">${day}</div>
    <canvas width="38" height="38"></canvas>
<div class="forecast-temperature"><span class="forecast-temperature-max">11°</span><span class="forecast-temperature-min">7°</span>
</div>
</div>
</div>`
  };
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

let celsiusLink = document.querySelector("#tempElement");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitConversion = document.querySelector("#tempSwitch");
fahrenheitConversion.addEventListener("change", displayFahrenheitTemp);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

displayForecast();
searchCity("Milan");
