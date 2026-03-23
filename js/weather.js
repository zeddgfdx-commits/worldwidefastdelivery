// OpenWeatherMap API key
const API_KEY = 'your_api_key_here';

// Function to fetch weather data by location
async function fetchWeather(location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('Weather data not found');
    }
    return await response.json();
}

// Function to display weather data
function displayWeather(data) {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Condition: ${data.weather[0].description}</p>
    `;
}

// Function to handle search input
document.getElementById('search-btn').addEventListener('click', async () => {
    const location = document.getElementById('search-input').value;
    try {
        const weatherData = await fetchWeather(location);
        displayWeather(weatherData);
    } catch (error) {
        console.error(error);
        alert('Could not fetch weather data.');
    }
});

// Function to detect user's location
async function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            const weatherData = await response.json();
            displayWeather(weatherData);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

detectLocation();