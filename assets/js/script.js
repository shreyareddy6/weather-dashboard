const searchButton = document.querySelector("#search-button");
const apiKey = "370d010cd162e9d8f6adde61521f87cd";
const cityButtons = document.querySelector(".recent-cities");
const searchInput = document.querySelector("#search-input");

// get stored cities, if empty then make it an empty array
let storedCities = JSON.parse(localStorage.getItem("cities")) || [];

function searchCity(newCity) {
  console.log(newCity);
  let cityName = newCity;
  console.log(cityName);
  //   5 day forecast
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        renderCurrentWeather(cityName, data);
        storeSearchedCities(cityName);
        displayRecentSearch();
        dsiplayFiveDaysData(data);
      });
    } else {
      alert("error");
    }
  });
}

function renderCurrentWeather(city, weather) {
  const currentWeatherDiv = document.querySelector("#current-weather");

  currentWeatherDiv.textContent = "";

  const temp = weather.list[0].main.temp;
  const wind = weather.list[0].wind.speed;
  const humidity = weather.list[0].main.humidity;
  const icon = weather.list[0].weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  const cityField = document.createElement("h2");
  const tempField = document.createElement("p");
  const windField = document.createElement("p");
  const humidityField = document.createElement("p");
  const iconField = document.createElement("img");

  cityField.textContent = city;
  tempField.textContent = `Temp: ${convertTemp(temp)}°F`;
  windField.textContent = `Wind: ${convertWind(wind)} mph`;
  humidityField.textContent = `Humidity: ${humidity}%`;
  iconField.setAttribute("src", iconUrl);
  currentWeatherDiv.classList = "border p-3";
  currentWeatherDiv.append(
    cityField,
    iconField,
    tempField,
    windField,
    humidityField
  );
}

function dsiplayFiveDaysData(weather) {
  const fiveDaysDiv = document.querySelector(".forecast");
  const fiveDaysData = document.querySelector(".forecast-cards");
  const forecastH2 = document.createElement("h2");

  fiveDaysData.textContent = "";
  forecastH2.textContent = "";
  forecastH2.textContent = "5-days Forecast:";
  fiveDaysDiv.append(forecastH2);

  for (let i = 0; i < weather.list.length; i++) {
    const date = weather.list[i].dt_txt;
    // weather date object
    const weatherDate = new Date(date + "Z");
    if (weatherDate.getUTCHours() == 12) {
      console.log("inside for");
      console.log("weatherDate " + formatDate(weatherDate));
      const temp = weather.list[i].main.temp;
      const wind = weather.list[i].wind.speed;
      const humidity = weather.list[i].main.humidity;
      const icon = weather.list[i].weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

      const forecastCard = document.createElement("div");
      const dateField = document.createElement("h2");
      const tempField = document.createElement("p");
      const windField = document.createElement("p");
      const humidityField = document.createElement("p");
      const iconField = document.createElement("img");

      forecastCard.classList = "forecast-card col-md-2";
      dateField.textContent = formatDate(weatherDate);
      tempField.textContent = `Temp: ${convertTemp(temp)}°F`;
      windField.textContent = `Wind: ${convertWind(wind)} mph`;
      humidityField.textContent = `Humidity: ${humidity}%`;
      iconField.setAttribute("src", iconUrl);
      dateField.style.fontSize = "1.5rem";
      dateField.style.fontWeight = "bolder";
      forecastCard.append(
        dateField,
        iconField,
        tempField,
        windField,
        humidityField
      );
      fiveDaysData.append(forecastCard);
      fiveDaysDiv.append(fiveDaysData);
    }
  }
}

// history of searched cities
function storeSearchedCities(city) {
  storedCities.push(city);
  storedCities = [...new Set(storedCities)];
  localStorage.setItem("cities", JSON.stringify(storedCities));
}

function displayRecentSearch() {
  const recentSearchDiv = document.querySelector(".recent-cities");
  recentSearchDiv.textContent = "";
  console.log("in display");
  for (city of storedCities) {
    const cityButton = document.createElement("button");
    cityButton.setAttribute("class", "recent-cities");
    cityButton.textContent = city;
    recentSearchDiv.append(cityButton);
  }
}

function handleSearchHistory(e) {
  //   if (!e.target.matches(".recent-cities")) {
  //     return;
  //   }
  console.log("inside button");
  console.log(e.target.textContent);
  //   const input = e.target.textContent;
  //   console.log("input" + input);
  searchCity(e.target.textContent);
}

// Function to format date as "MM/DD/YYYY"
function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

//convert temperature from kelvin to fahrenheit
function convertTemp(kelvin) {
  return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(2);
}

//convert wind mts per second to miles per hour
function convertWind(mps) {
  return (mps * 2.23694).toFixed(2);
}

searchButton.addEventListener("click", () => {
  let searchInputValue = searchInput.value;
  if (searchInputValue) {
    searchCity(searchInputValue);
    searchInput.value = "";
    console.log("outside");
  }
});

cityButtons.addEventListener("click", handleSearchHistory);
displayRecentSearch();
