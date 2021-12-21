let weather = {
  apiKey: "b46a89b4290e4cd0a3230f8f5976eb7e",
  fetchWeather: function (city) {
    fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  //current weather//
  displayWeather: function (data) {
    const { city_name } = data.data[0];
    const { icon, description } = data.data[0].weather;
    const { temp, rh } = data.data[0];
    const { wind_spd } = data.data[0];
    console.log(city_name, icon, description, temp, rh, wind_spd);

    //set values for current weather//
    document.querySelector(".city").innerText = `Weather in ${city_name}`;
    document.querySelector(
      ".icon"
    ).src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = `${temp}°C`;
    document.querySelector(".humidity").innerText = `Humidity: ${rh}%`;
    document.querySelector(".wind").innerText = `Wind Speed: ${wind_spd} km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${city_name} landscape')`;
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

//fetch current location//
function initGeoLocation() {
  weather.fetchWeather("New York");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, fail);
  } else {
    alert("Sorry, your browser does not support geolocation data.");
  }
}

function success(position) {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=59e8a87c093d4fad88b5491f67143369`
  )
    .then((response) => response.json())
    .then((position) =>
      weather.fetchWeather(position.results[0].components.postal_city)
    );
}

function fail() {
  weather.fetchWeather("New York");
}

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });

initGeoLocation();
