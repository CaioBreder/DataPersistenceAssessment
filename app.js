const weatherForm = document.getElementById("weather-form");
weatherForm.addEventListener("submit", handleFormSubmit);

const weatherInfo = document.getElementById("weather-info");

const apiKey = "02b52bc08174cee4a0731eccbe035f58";

async function handleFormSubmit(event) {
  event.preventDefault();

  const city = document.getElementById("city").value;

  try {
    const data = await getWeatherData(city);
    displayWeatherData(data);
  } catch (error) {
    console.error(error);
    displayErrorMessage("Could not get weather data. Please try again.");
  }
}

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("API call failed");
  }
  const data = await response.json();
  return data;
}

function displayWeatherData(data) {
  weatherInfo.innerHTML = "";

  const cityName = data.name;
  const country = data.sys.country;
  const cityInfo = document.createElement("p");
  cityInfo.innerText = `${cityName}, ${country}`;
  weatherInfo.appendChild(cityInfo);

  const currentTemp = data.main.temp;
  const tempInfo = document.createElement("p");
  tempInfo.innerText = `Current temperature: ${currentTemp}°C`;
  weatherInfo.appendChild(tempInfo);

  const lowTemp = data.main.temp_min;
  const lowTempInfo = document.createElement("p");
  lowTempInfo.innerText = `Low temperature for the day: ${lowTemp}°C`;
  weatherInfo.appendChild(lowTempInfo);

  const highTemp = data.main.temp_max;
  const highTempInfo = document.createElement("p");
  highTempInfo.innerText = `High temperature for the day: ${highTemp}°C`;
  weatherInfo.appendChild(highTempInfo);
}
