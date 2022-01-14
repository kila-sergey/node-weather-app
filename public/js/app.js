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
    const loadingNode = weatherNode.querySelector(".loading");
    const address = locationFieldNode.value;

    event.preventDefault();
    loadingNode.classList.add("visible");
    weatherLocationNode.textContent = "";
    weatherInfoNode.textContent = "";
    errorNode.textContent = "";

    getWeather(address)
      .then((response) => response.json())
      .then((weatherData) => {
        if (weatherData.error) {
          errorNode.textContent = weatherData.error;
        } else {
          const weatherInfoMessage = `${weatherData.weather_descriptions[0]}. It is currently ${weatherData.temperature} degree out. Feels like ${weatherData.feelslike}.`;
          weatherLocationNode.textContent = weatherData.location;
          weatherInfoNode.textContent = weatherInfoMessage;
        }
      })
      .finally(() => loadingNode.classList.remove("visible"));

    weatherFormNode.reset();
  });
}
