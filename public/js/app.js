const getWeather = (address) => {
  return fetch(`/weather?${new URLSearchParams({ address })}`);
};

const weatherFormNode = document.querySelector("#weather-form");
const locationFieldNode = document.querySelector("#location-field");
const weatherNode = document.querySelector("#weather-box");

if (weatherFormNode) {
  weatherFormNode.addEventListener("submit", (event) => {
    const errorNode = weatherNode.querySelector(".error");
    const weatherLocationNode = weatherNode.querySelector(".weather-location");
    const weatherInfoNode = weatherNode.querySelector(".weather-info");
    const weatherTextNode = weatherNode.querySelector(".weather-info__text");
    const loadingNode = weatherNode.querySelector(".loading");
    const address = locationFieldNode.value;

    event.preventDefault();
    loadingNode.classList.add("visible");
    weatherLocationNode.textContent = "";
    weatherTextNode.textContent = "";
    errorNode.textContent = "";

    getWeather(address)
      .then((response) => response.json())
      .then((weatherData) => {
        if (weatherData.error) {
          errorNode.textContent = weatherData.error;
        } else {
          const weatherInfoMessage = `${weatherData.weather_descriptions[0]}. It is currently ${weatherData.temperature} degree out. Feels like ${weatherData.feelslike}.`;

          const weatherImgNode = document.createElement("img");
          weatherImgNode.setAttribute("src", weatherData.weather_icons[0]);
          weatherImgNode.classList.add("weather-info__icon");

          weatherLocationNode.textContent = weatherData.location;
          weatherTextNode.textContent = weatherInfoMessage;

          weatherInfoNode.insertBefore(weatherImgNode, weatherTextNode);
        }
      })
      .finally(() => loadingNode.classList.remove("visible"));

    weatherFormNode.reset();
  });
}
