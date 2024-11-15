const weatherApiKey = '3b4766a1ad259635f0e86e54694c9c73';
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=42.73&lon=-73.68&appid=${weatherApiKey}`;
const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=42.73&lon=-73.68&appid=${weatherApiKey}`;
const nasaApiKey = 'DEMO_KEY';
const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`;

// Fetch current weather
document.getElementById('fetch-weather').addEventListener('click', () => {
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.main && data.weather && data.weather[0]) {
                const temperatureF = ((data.main.temp - 273.15) * 9 / 5) + 32;
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                document.getElementById('temp-div').innerHTML = `Temperature: ${temperatureF.toFixed(2)}°F`;
                document.getElementById('weather-info').innerHTML = `
                    Weather: ${data.weather[0].description}<br>
                    Humidity: ${data.main.humidity}%<br>
                    Wind Speed: ${(data.wind.speed * 2.23694).toFixed(2)} mph
                `;
                document.getElementById('weather-icon').src = iconUrl;
                document.getElementById('weather-icon').style.display = 'block';

                sendToServer('save_weather_data.php', data);
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
});

// Fetch hourly forecast
fetch(forecastApiUrl)
    .then(response => response.json())
    .then(data => {
        const hourlyDiv = document.getElementById('hourly-forecast');
        data.list.slice(0, 5).forEach(hour => {
            const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const temp = ((hour.main.temp - 273.15) * 9 / 5 + 32).toFixed(2);
            hourlyDiv.innerHTML += `<p>${time}: ${temp}°F</p>`;
        });
    })
    .catch(error => console.error('Error fetching hourly forecast:', error));

// Fetch NASA APOD
document.getElementById('fetch-astronomy').addEventListener('click', () => {
    fetch(nasaApiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('apod-title').innerHTML = `Title: ${data.title}`;
            document.getElementById('apod-description').innerHTML = `Explanation: ${data.explanation}`;
            document.getElementById('apod-image').src = data.url;
            document.getElementById('apod-image').style.display = 'block';

            sendToServer('save_apod_data.php', data);
        })
        .catch(error => console.error('Error fetching NASA APOD:', error));
});

// Send data to the server
function sendToServer(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(data => console.log('Server response:', data))
        .catch(error => console.error('Error sending data to server:', error));
}
