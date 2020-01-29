function Init() {
  return {
    location: document.getElementById("location"),
    city: document.getElementById("city"),
    weatherType: document.getElementById("weatherType"),
    iconWeather: document.getElementById("iconweather"),
    temperature: document.getElementById("temperature"),
    windSpeed: document.getElementById("windSpeed"),
    tooggleBtn: document.getElementById("toggle")
  };
}
const init = new Init();

function weatherApp() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, showError);
  } else {
    alert("Your browser don't support Geolocation");
  }

  function success(position) {
    let lat = position.coords.latitude.toFixed(5);
    let long = position.coords.longitude.toFixed(5);
    const apikey = "96b6eeda649e5082b2b61231485e4291";
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}`;

    function weatherData() {
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          let dates = data;
          let tempSwap = true;
          //Name of city
          init.city.innerHTML = dates.name;
          //Weather description
          init.weatherType.innerHTML = dates.weather[0].description;
          //Weather icon
          let icon = dates.weather[0].icon;
          let iconSrc = `http://openweathermap.org/img/wn/${icon}.png`;
          init.iconWeather.setAttribute("src", iconSrc);
          //Toggle temperature
          kTemp = dates.main.temp;
          fTemp = (kTemp * (9 / 5) - 459.67).toFixed(1);
          cTemp = (kTemp - 273).toFixed(1);
          init.temperature.innerHTML = `${kTemp}&#8490;`;
          init.tooggleBtn.addEventListener("click", function() {
            if (tempSwap === false) {
              init.temperature.innerHTML = `${fTemp}&#8451;`;
              tempSwap = true;
            } else {
              init.temperature.innerHTML = `${cTemp}&#8457;`;
              tempSwap = false;
            }
          });
          //Wind speed
          init.windSpeed.innerHTML =
            (2.237 * dates.wind.speed).toFixed(1) + " mph";
        });
    }
    weatherData();
  }

  function showError(error) {
    switch (error) {
      case error.PERMISSION_DENIED:
        init.location.innerHTML = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        init.location.innerHTML = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        init.location.innerHTML = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        init.location.innerHTML = "An unknown error occurred.";
        break;
    }
  }
}

weatherApp();
