// Get the DOM elements
const weatherInfoContainer = document.getElementById('weather-info-container');

// Set up the speech synthesis API
const synth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();
utterance.lang = 'en-US';

// Function to get the weather data for a location and read it aloud
let replaySpeech;
function getWeather(location) {
  // Make a request to the OpenWeatherMap API to get the weather data for the location
  const locationInput = document.getElementById('location').value;
  const apiKey = '8bf03d6e2c45b7a8ee4f026ae6f9e3fd';

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Check if weather is defined before displaying the weather data
      if (data.weather) {
        // Display the weather information on the screen
        const description = data.weather[0].description;
        const temperature = data.main.temp;
        const feelsLikeTemp = data.main.feels_like;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const windDirection = data.wind.deg;

        const table = document.createElement('table');
        table.classList.add('weather-table');

        const tableHeader = document.createElement('tr');
        tableHeader.classList.add('table-header');

        const cityHeader = document.createElement('th');
        cityHeader.innerText = 'City';
        tableHeader.appendChild(cityHeader);

        const diagramHeader = document.createElement('th');
        diagramHeader.innerText = 'Diagram';
        tableHeader.appendChild(diagramHeader);

        const descriptionHeader = document.createElement('th');
        descriptionHeader.innerText = 'Description';
        tableHeader.appendChild(descriptionHeader);

        const temperatureHeader = document.createElement('th');
        temperatureHeader.innerText = 'Temperature (°C)';
        tableHeader.appendChild(temperatureHeader);

        const feelsLikeHeader = document.createElement('th');
        feelsLikeHeader.innerText = 'Feels Like (°C)';
        tableHeader.appendChild(feelsLikeHeader);

        const humidityHeader = document.createElement('th');
        humidityHeader.innerText = 'Humidity (%)';
        tableHeader.appendChild(humidityHeader);

        const windSpeedHeader = document.createElement('th');
        windSpeedHeader.innerText = 'Wind Speed (m/s)';
        tableHeader.appendChild(windSpeedHeader);

        const windDirectionHeader = document.createElement('th');
        windDirectionHeader.innerText = 'Wind Direction (°)';
        tableHeader.appendChild(windDirectionHeader);

        table.appendChild(tableHeader);

        const tableRow = document.createElement('tr');

        const cityData = document.createElement('td');
        cityData.innerText = locationInput;
        tableRow.appendChild(cityData);

        const diagramData = document.createElement('td');
        diagramData.innerHTML =
          '<img src="https://openweathermap.org/img/w/' +
          data.weather[0].icon +
          '.png">';
        tableRow.appendChild(diagramData);

        const descriptionData = document.createElement('td');
        descriptionData.innerText = description;
        tableRow.appendChild(descriptionData);

        const temperatureData = document.createElement('td');
        temperatureData.innerText = temperature;
        tableRow.appendChild(temperatureData);

        const feelsLikeData = document.createElement('td');
        feelsLikeData.innerText = feelsLikeTemp;
        tableRow.appendChild(feelsLikeData);

        const humidityData = document.createElement('td');
        humidityData.innerText = humidity;
        tableRow.appendChild(humidityData);

        const windSpeedData = document.createElement('td');
        windSpeedData.innerText = windSpeed;
        tableRow.appendChild(windSpeedData);

        const windDirectionData = document.createElement('td');
        windDirectionData.innerText = windDirection;
        tableRow.appendChild(windDirectionData);

        table.appendChild(tableRow);

        const weatherInfoContainer = document.getElementById(
          'weather-info-container'
        );
        weatherInfoContainer.innerHTML = '';

        const weatherInfo = document.createElement('p');
        weatherInfo.classList.add('weather-info');
        weatherInfo.innerText = 'Current weather:';
        weatherInfoContainer.appendChild(weatherInfo);

        weatherInfoContainer.appendChild(table);

        // Speech synthesis
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(
          `The current weather in ${locationInput} is ${description}. The temperature is ${temperature} degrees Celsius, but it feels like ${feelsLikeTemp} degrees Celsius. The humidity is ${humidity} percent, and the wind speed is ${windSpeed} meters per second. The wind is blowing in the direction of ${windDirection} degrees.`
        );
        synth.speak(utterance);

        // Make a separate API request to get the forecast data for the location
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationInput}&units=metric&appid=${apiKey}`;

        fetch(forecastApiUrl)
          .then((response) => response.json())
          .then((data) => {
            displayForecast(data);
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
          cityName = data.name;

          //table
          const description = data.weather[0].description;
          const temperature = data.main.temp;
          const feelsLikeTemp = data.main.feels_like;
          const humidity = data.main.humidity;
          const windSpeed = data.wind.speed;
          const windDirection = data.wind.deg;

          const table = document.createElement('table');
          table.classList.add('weather-table');

          const tableHeader = document.createElement('tr');
          tableHeader.classList.add('table-header');

          const cityHeader = document.createElement('th');
          cityHeader.innerText = 'City';
          tableHeader.appendChild(cityHeader);

          const diagramHeader = document.createElement('th');
          diagramHeader.innerText = 'Diagram';
          tableHeader.appendChild(diagramHeader);

          const descriptionHeader = document.createElement('th');
          descriptionHeader.innerText = 'Description';
          tableHeader.appendChild(descriptionHeader);

          const temperatureHeader = document.createElement('th');
          temperatureHeader.innerText = 'Temperature (°C)';
          tableHeader.appendChild(temperatureHeader);

          const feelsLikeHeader = document.createElement('th');
          feelsLikeHeader.innerText = 'Feels Like (°C)';
          tableHeader.appendChild(feelsLikeHeader);

          const humidityHeader = document.createElement('th');
          humidityHeader.innerText = 'Humidity (%)';
          tableHeader.appendChild(humidityHeader);

          const windSpeedHeader = document.createElement('th');
          windSpeedHeader.innerText = 'Wind Speed (m/s)';
          tableHeader.appendChild(windSpeedHeader);

          const windDirectionHeader = document.createElement('th');
          windDirectionHeader.innerText = 'Wind Direction (°)';
          tableHeader.appendChild(windDirectionHeader);

          table.appendChild(tableHeader);

          const tableRow = document.createElement('tr');

          const cityData = document.createElement('td');
          cityData.innerText = cityName;
          tableRow.appendChild(cityData);

          const diagramData = document.createElement('td');
          diagramData.innerHTML =
            '<img src="https://openweathermap.org/img/w/' +
            data.weather[0].icon +
            '.png">';
          tableRow.appendChild(diagramData);

          const descriptionData = document.createElement('td');
          descriptionData.innerText = description;
          tableRow.appendChild(descriptionData);

          const temperatureData = document.createElement('td');
          temperatureData.innerText = temperature;
          tableRow.appendChild(temperatureData);

          const feelsLikeData = document.createElement('td');
          feelsLikeData.innerText = feelsLikeTemp;
          tableRow.appendChild(feelsLikeData);

          const humidityData = document.createElement('td');
          humidityData.innerText = humidity;
          tableRow.appendChild(humidityData);

          const windSpeedData = document.createElement('td');
          windSpeedData.innerText = windSpeed;
          tableRow.appendChild(windSpeedData);

          const windDirectionData = document.createElement('td');
          windDirectionData.innerText = windDirection;
          tableRow.appendChild(windDirectionData);

          table.appendChild(tableRow);

          const weatherInfoContainer = document.getElementById(
            'weather-info-container'
          );
          weatherInfoContainer.innerHTML = '';
          const weatherInfo = document.createElement('p');
          weatherInfo.classList.add('weather-info');
          weatherInfo.innerText = 'Current weather:';
          weatherInfoContainer.appendChild(weatherInfo);

          weatherInfoContainer.appendChild(table);

          // Speech synthesis
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(
            `The current weather in ${cityName}  is ${description}. The temperature is ${temperature} degrees Celsius, but it feels like ${feelsLikeTemp} degrees Celsius. The humidity is ${humidity} percent, and the wind speed is ${windSpeed} meters per second. The wind is blowing in the direction of ${windDirection} degrees.`
          );
          synth.speak(utterance);

          const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
          fetch(forecastApiUrl)
            .then((response) => response.json())
            .then((data) => {
              displayForecast(data); // raw data from the API
            })
            .catch((error) => {
              console.error('Error fetching forecast data:', error);
            });
        });
    });
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

function displayForecast(apiData) {
  const forecastData = apiData.list.reduce((result, item) => {
    const date = new Date(item.dt_txt);

    // Check if date is in the next 7 days starting from today
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    if (date >= today && date < nextWeek) {
      const day = date.toLocaleDateString('en-US', {
        weekday: 'long',
      });

      if (!result[day]) {
        result[day] = {
          date: date,
          temperatures: [],
          humidity: [],
          hourlyData: [],
        };
      }

      result[day].temperatures.push(item.main.temp);
      result[day].humidity.push(item.main.humidity);

      result[day].hourlyData.push({
        date: date,
        time: date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }),
        temperature: item.main.temp,
        humidity: item.main.humidity,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      });
    }

    return result;
  }, {});

  const cardsContainer = document.getElementById('cards-container');
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = '';
  cardsContainer.innerHTML = '';

  const weatherInfo = document.createElement('h2');
  weatherInfo.classList.add('weather-info');
  weatherInfo.innerText = 'Forecast:';

  cardsContainer.appendChild(weatherInfo);

  // Create cards for each date
  Object.values(forecastData).forEach((dateData) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-header">
        ${dateData.date.toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })}
      </div>
      <div class="card-body">
        <div class="temp">
          ${Math.round(Math.min(...dateData.temperatures))}°C - ${Math.round(
      Math.max(...dateData.temperatures)
    )}°C
        </div>
        <div class="humidity">
          ${Math.round(Math.min(...dateData.humidity))}% - ${Math.round(
      Math.max(...dateData.humidity)
    )}%
        </div>
        <img src="https://openweathermap.org/img/w/${
          dateData.hourlyData[0].icon
        }.png" />
      </div>
    `;
    card.addEventListener('click', () => {
      showHourlyData(dateData.hourlyData);
      tableContainer.style.display = 'block';
      tableContainer.style.margin = '0 auto';
    });
    cardsContainer.appendChild(card);

    // Speech synthesis
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(
      `Now for the Forecast; On ${dateData.date.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })} the temperature will be between ${Math.round(
        Math.min(...dateData.temperatures)
      )}°C to ${Math.round(
        Math.max(...dateData.temperatures)
      )}°C. And the humidity will be between ${Math.round(
        Math.min(...dateData.humidity)
      )}% to ${Math.round(Math.max(...dateData.humidity))}%`
    );
    synth.speak(utterance);
  });

  // Create table for hourly data
  const table = document.createElement('table');
  table.style.display = 'block; margin: 0 auto';
  tableContainer.appendChild(table);

  function showHourlyData(hourlyData) {
    table.innerHTML = '';
    const tableHeaders = document.createElement('tr');
    tableHeaders.innerHTML = `
      <th>Date</th>
      <th>Time</th>
      <th>Temperature (°C)</th>
      <th>Humidity (%)</th>
      <th>Description</th>
      <th>Icon</th>
    `;
    table.appendChild(tableHeaders);
    hourlyData.forEach((item) => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${new Date(item.date).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })}</td>
          <td>${item.time}</td>
          <td>${Math.round(item.temperature)}°C</td>
          <td>${Math.round(item.humidity)}%</td>
          <td>${item.description}</td>
          <td><img src="https://openweathermap.org/img/w/${
            item.icon
          }.png" /></td>
          `;
      table.appendChild(row);
    });
  }
}
