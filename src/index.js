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
let city = prompt("Enter a city");

if (weather[city] !== undefined) {
  city = city.toLowerCase();
  city = city.trim();
  let humidity = weather[city].humidity;
  let celsius = Math.round(weather[city].temp);

  alert(
    `It is currently ${celsius} °C, in ${city}, with a humidity of ${humidity}`
  );
} else {
  alert("Sorry, we don't know the weather for this city, try going to Google.");
}

let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];
let hours = now.getHours();

let paragraph = document.querySelector("#currentDate");
paragraph.innerHTML = `${day} ${hours}`;

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tempElement").innerHTML = Math.round(
    response.data.main.temp
  );
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Milan");
