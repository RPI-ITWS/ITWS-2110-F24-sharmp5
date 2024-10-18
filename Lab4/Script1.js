// script.js

// OpenWeatherMap API configuration
const weatherApiKey = '3b4766a1ad259635f0e86e54694c9c73';
const city = 'Troy';
const state = 'NY';

// Fetch weather data from OpenWeatherMap API
document.getElementById('fetch-weather').addEventListener('click', () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=3b4766a1ad259635f0e86e54694c9c73")
        .then(response => response.json())
        .then(data => {
            if (data.main && data.weather && data.weather[0]) {
                const temperatureF = ((data.main.temp - 273.15) * 9 / 5) + 32;
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                document.getElementById('temp-div').innerHTML = `Temperature: ${temperatureF.toFixed(2)}°F`;
                document.getElementById('weather-info').innerHTML = `
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${(data.wind.speed * 2.23694).toFixed(2)} mph</p>
                `;
                document.getElementById('weather-icon').src = iconUrl;
                document.getElementById('weather-icon').alt = data.weather[0].description;
                document.getElementById('weather-icon').style.display = 'block';

                sendToServer('save_climate_data.php', {
                    temperature: temperatureF.toFixed(2),
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    wind_speed: (data.wind.speed * 2.23694).toFixed(2)
                });
            } else {
                console.error("Missing data in weather API response", data);
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
});

// NASA APOD API configuration
const nasaApiKey = 'DEMO_KEY'; // Replace with your own key if required
document.getElementById('fetch-astronomy').addEventListener('click', () => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log("NASA APOD data:", data); // Debugging log

            document.getElementById('apod-image').src = data.url;
            document.getElementById('apod-title').innerHTML = `Title: ${data.title}`;
            document.getElementById('apod-description').innerHTML = `Explanation: ${data.explanation}`;
            document.getElementById('apod-image').style.display = 'block';

            // Send APOD data to PHP
            sendToServer('save_space_data.php', {
                title: data.title,
                explanation: data.explanation,
                image_url: data.url
            });
        })
        .catch(error => console.error('Error fetching APOD data:', error));
});

// Send data to server via POST
function sendToServer(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Error sending data to server:', error);
    });
}

// Load data from the database
document.getElementById('load-from-db').addEventListener('click', loadDataFromDatabase);

function loadDataFromDatabase() {
    fetch('load_data.php')
        .then(response => response.json())
        .then(data => {
            if (!data) {
                console.error('No data received from PHP');
                return;
            }

            const weather = data.climate_data;
            const astronomy = data.space_data;

            // Display weather data from database
            if (weather) {
                document.getElementById('temp-div').innerHTML = `Temperature: ${weather.temperature}°F`;
                document.getElementById('weather-info').innerHTML = `
                    <p>Weather: ${weather.description}</p>
                    <p>Humidity: ${weather.humidity}%</p>
                    <p>Wind Speed: ${weather.wind_speed} mph</p>
                `;
            } else {
                console.warn('No weather data available in the database.');
            }

            // Display APOD data from database
            if (astronomy) {
                document.getElementById('apod-image').src = astronomy.image_url;
                document.getElementById('apod-title').innerHTML = `Title: ${astronomy.title}`;
                document.getElementById('apod-description').innerHTML = `Explanation: ${astronomy.explanation}`;
                document.getElementById('apod-image').style.display = 'block';
            } else {
                console.warn('No astronomy data available in the database.');
            }
        })
        .catch(error => console.error('Error loading data from the database:', error));
}

// Update weather and APOD data
document.getElementById('update-weather').addEventListener('click', () => {
    const updatedWeather = {
        temperature: document.getElementById('new-temperature').value,
        description: document.getElementById('new-weather-description').value,
        humidity: document.getElementById('new-humidity').value,
        wind_speed: document.getElementById('new-wind-speed').value
    };
    sendToServer('update_data.php', { climate_data: JSON.stringify(updatedWeather) });
});

document.getElementById('update-apod').addEventListener('click', () => {
    const updatedAstronomy = {
        title: document.getElementById('new-apod-title').value,
        explanation: document.getElementById('new-apod-description').value
    };
    sendToServer('update_data.php', { space_data: JSON.stringify(updatedAstronomy) });
});