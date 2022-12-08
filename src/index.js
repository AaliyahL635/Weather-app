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

function showTemperature(response) {
  console.log(response);
  let iconElement = document.querySelector("#icon");
  let celsiusTemperature = response.data.temperature.current;
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
  let apiKey = "733f7b9a71c3079758e35bf2e14927b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitConversion = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#tempElement");
  temperatureElement.innerHTML = Math.round(fahrenheitConversion);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempElement");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#tempElement");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitConversion = document.querySelector("#tempSwitch");
fahrenheitConversion.addEventListener("change", displayFahrenheitTemp);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Milan");
