// Get the DOM elements
const weatherInfoContainer = document.getElementById('weather-info-container');

// Set up the speech synthesis API
const synth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();
utterance.lang = 'en-US';

// Function to read aloud the weather data
function speakWeather(currentWeather, forecastData) {
  const currentDescription = currentWeather.weather[0].description;
  const currentTemperature = currentWeather.main.temp;
  const currentFeelsLike = currentWeather.main.feels_like;
  const currentHumidity = currentWeather.main.humidity;
  const currentWindSpeed = currentWeather.wind.speed;
  const currentWindDirection = currentWeather.wind.deg;

  const currentSpeechMessage = `The current weather in ${currentWeather.name} is ${currentDescription}. The temperature is ${currentTemperature} degrees Celsius, but it feels like ${currentFeelsLike} degrees Celsius. The humidity is ${currentHumidity} percent. The wind speed is ${currentWindSpeed} meters per second, and the wind direction is ${currentWindDirection} degrees.`;

  // Create a div to hold both the current weather and forecast data
  const weatherInfo = document.createElement('div');
  weatherInfo.classList.add('weather-info');

  // Create a p element to hold the current weather data
  const currentWeatherInfo = document.createElement('p');
  currentWeatherInfo.classList.add('current-weather');
  currentWeatherInfo.innerText = currentSpeechMessage;
  weatherInfo.appendChild(currentWeatherInfo);

  // Loop through the forecast data and create a p element for each forecast entry
  console.log('Creating info element...');
  console.log('loop', forecastData);
  if (forecastData && forecastData.list) {
    console.log('loop', forecastData);
    forecastData.list.forEach((forecast) => {
      console.log('Creating info element...');
      const forecastDescription = forecast.weather[0].description;
      const forecastTemperature = forecast.main.temp;
      const forecastDate = forecast.dt_txt;

      const forecastSpeechMessage = `Forecast for ${forecastDate}: ${forecastDescription}, with a temperature of ${forecastTemperature} degrees Celsius.`;

      const forecastInfo = document.createElement('p');
      forecastInfo.classList.add('forecast-info');
      forecastInfo.innerText = forecastSpeechMessage;
      weatherInfo.appendChild(forecastInfo);
    });
  } else {
  }

  // Remove any existing weather info from the page
  const weatherContainer = document.getElementById('weather-info-container');
  weatherContainer.innerHTML = '';

  // Add the weather info to the page
  weatherContainer.appendChild(weatherInfo);

  // Speak the current weather and forecast data
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(currentSpeechMessage);
  synth.speak(utterance);

  if (forecastData && forecastData.list) {
    forecastData.list.forEach((forecast) => {
      const forecastDescription = forecast.weather[0].description;
      const forecastTemperature = forecast.main.temp;
      const forecastDate = forecast.dt_txt;
      const forecastSpeechMessage = `Forecast for ${forecastDate}: ${forecastDescription}, with a temperature of ${forecastTemperature} degrees Celsius.`;

      const utterance = new SpeechSynthesisUtterance(forecastSpeechMessage);
      synth.speak(utterance);
    });
  }
}

// Function to get the weather data for a location and read it aloud
function getWeather(location) {
  // Make a request to the OpenWeatherMap API to get the weather data for the location
  const locationInput = document.getElementById('location').value;
  const apiKey = '8bf03d6e2c45b7a8ee4f026ae6f9e3fd';
  console.log(locationInput);
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Check if weather is defined before displaying the weather data
      if (data.weather) {
        // Display the weather information on the screen
        const date = new Date(data.dt * 1000);
        const dateString = date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });
        const timeString = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
        });
        const description = data.weather[0].description;
        const temperature = data.main.temp;
        const feelsLikeTemp = data.main.feels_like;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const windDirection = data.wind.deg;

        const weatherMessage = `The current weather in ${locationInput} is ${description}. The temperature is ${temperature} degrees Celsius, but it feels like ${feelsLikeTemp} degrees Celsius. The humidity is ${humidity} percent. The wind speed is ${windSpeed} meters per second, and the wind direction is ${windDirection} degrees.`;

        const weatherInfoContainer = document.getElementById(
          'weather-info-container'
        );
        weatherInfoContainer.innerHTML = '';
        const weatherInfo = document.createElement('p');
        weatherInfo.classList.add('weather-info');
        weatherInfo.innerText = 'Current weather:';
        weatherInfoContainer.appendChild(weatherInfo);

        const weatherItem = document.createElement('p');
        weatherItem.innerText = weatherMessage;
        weatherInfoContainer.appendChild(weatherItem);

        // Speech synthesis
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(weatherMessage);
        synth.speak(utterance);

        // Make a separate API request to get the forecast data for the location
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationInput}&units=metric&appid=${apiKey}`;

        fetch(forecastApiUrl)
          .then((response) => response.json())
          .then((data) => {
            // Display the forecast information on the screen
            const forecastInfo = document.createElement('p');
            forecastInfo.classList.add('weather-info');
            forecastInfo.innerText = 'Forecast:';
            weatherInfoContainer.appendChild(forecastInfo);

            const forecastList = document.createElement('ul');
            forecastList.classList.add('forecast-list');

            for (let i = 0; i < data.list.length; i++) {
              const forecast = data.list[i];
              const time = new Date(forecast.dt * 1000);
              const date = time.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              });
              const timeString = time.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
              });
              const description = forecast.weather[0].description;
              const temperature = forecast.main.temp;

              const forecastMessage = `${date} at ${timeString}: ${description} with a temperature of ${temperature.toFixed(
                2
              )} degrees Celsius.`;

              const forecastItem = document.createElement('li');
              forecastItem.innerText = forecastMessage;
              forecastList.appendChild(forecastItem);
            }

            weatherInfoContainer.appendChild(forecastList);
          })
          .catch((error) => console.log(error));
      } else {
        console.log('Error: Unable to get weather data for location');
      }
    })
    .catch((error) => console.log(error));
}

// Function to pause the speech
function pauseSpeech() {
  synth.pause();
}

// Function to resume the speech
function resumeSpeech() {
  synth.resume();
}

// Function to stop the speech
function stopSpeech() {
  synth.cancel();
}

// Function to get the user's location and display the weather for that location
// Function to get the user's location and display the weather for that location
function getWeatherByLocation() {
  if (navigator.geolocation) {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Make a request to the OpenWeatherMap API to get the weather data for the user's location
      const apiKey = '8bf03d6e2c45b7a8ee4f026ae6f9e3fd';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Speak the weather data for the user's location
          speakWeather(data);

          // Make a request to the OpenWeatherMap API to get the forecast data for the user's location
          const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

          fetch(forecastApiUrl)
            .then((response) => response.json())
            .then((data) => {
              // Display the forecast information on the screen
              const forecastInfo = document.createElement('p');
              forecastInfo.classList.add('weather-info');
              forecastInfo.innerText = 'Forecast:';
              weatherInfoContainer.appendChild(forecastInfo);

              const forecastList = document.createElement('ul');
              forecastList.classList.add('forecast-list');

              for (let i = 0; i < data.list.length; i++) {
                const forecast = data.list[i];
                const time = new Date(forecast.dt_txt);
                const date = time.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                });
                const timeString = time.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                });
                const description = forecast.weather[0].description;
                const temperature = forecast.main.temp;

                const forecastMessage = `${date} at ${timeString}: ${description} with a temperature of ${temperature} degrees Celsius.`;

                const forecastItem = document.createElement('li');
                forecastItem.innerText = forecastMessage;
                forecastList.appendChild(forecastItem);
              }

              weatherInfoContainer.appendChild(forecastList);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}
