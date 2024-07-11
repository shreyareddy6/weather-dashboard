// City Input
const searchInput = document.querySelector("#serach-input");
const searchButton = document.querySelector("#search-button");
const apiKey = "370d010cd162e9d8f6adde61521f87cd";
function searchCity() {
  const cityName = searchInput.value.trim();
  console.log(cityName);
  //   5 day forecast
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  console.log(apiUrl);
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        renderCurrentWeather(cityName, data);
      });
    } else {
      alert("error");
    }
  });
}

function renderCurrentWeather(city, weather) {
  console.log(weather);
  const temp = weather.list[0].main.temp;
  const wind = weather.list[0].wind.speed;
  const humidity = weather.list[0].main.humidity;
  const icon = weather.list[0].weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
  console.log(iconUrl);
  console.log(humidity);
  console.log(temp);

  const currentWeatherDiv = document.querySelector("#current-weather");
  const cityField = document.createElement("h2");
  const tempField = document.createElement("p");
  const windField = document.createElement("p");
  const humidityField = document.createElement("p");
  const iconField = document.createElement("img");

  cityField.textContent = city;
  tempField.textContent = temp;
  windField.textContent = wind;
  humidityField.textContent = humidity;
  iconField.setAttribute("src", iconUrl);

  currentWeatherDiv.append(
    cityField,
    iconField,
    tempField,
    windField,
    humidityField
  );
}
searchButton.addEventListener("click", searchCity);
