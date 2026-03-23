const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherContainer = document.getElementById('weather');
const loadingIndicator = document.getElementById('loading');

async function fetchWeather(city) {
    loadingIndicator.style.display = 'block';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

    if (!response.ok) {
        loadingIndicator.style.display = 'none';
        throw new Error('Weather data could not be fetched.');
    }

    const data = await response.json();
    displayWeather(data);
    loadingIndicator.style.display = 'none';
}

function displayWeather(data) {
    const weatherHtml = `<h2>Weather in ${data.name}</h2>` +
                       `<p>Temperature: ${data.main.temp} °C</p>` +
                       `<p>Humidity: ${data.main.humidity} %</p>` +
                       `<p>Wind Speed: ${data.wind.speed} m/s</p>` +
                       `<p>Visibility: ${data.visibility / 1000} km</p>` +
                       `<p>Pressure: ${data.main.pressure} hPa</p>`;
    weatherContainer.innerHTML = weatherHtml;
}

async function fetchForecast(city) {
    loadingIndicator.style.display = 'block';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);

    if (!response.ok) {
        loadingIndicator.style.display = 'none';
        throw new Error('Forecast data could not be fetched.');
    }

    const forecastData = await response.json();
    displayForecast(forecastData);
    loadingIndicator.style.display = 'none';
}

function displayForecast(forecastData) {
    const forecastHtml = '<h2>5-Day Forecast:</h2>' + forecastData.list.slice(0, 5).map(item => {
        return `<p>${new Date(item.dt * 1000).toLocaleDateString()} - ${item.main.temp} °C, ${item.weather[0].description}</p>`;
    }).join('');
    weatherContainer.innerHTML += forecastHtml;
}

document.getElementById('fetchWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
    fetchForecast(city);
});