// OpenWeatherMap API configuration for Troy, NY
const weatherApiKey = '3b4766a1ad259635f0e86e54694c9c73';
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=42.73&lon=-73.68&appid=${weatherApiKey}`;

// NASA APOD API configuration
const nasaApiKey = 'DEMO_KEY';
const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`;

// Fetch weather data from OpenWeatherMap API for Troy, NY
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
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${(data.wind.speed * 2.23694).toFixed(2)} mph</p>
                `;
                document.getElementById('weather-icon').src = iconUrl;
                document.getElementById('weather-icon').alt = data.weather[0].description;
                document.getElementById('weather-icon').style.display = 'block';

                // Apply fade-in animation to display elements
                document.getElementById('temp-div').classList.add('fade-in');
                document.getElementById('weather-info').classList.add('fade-in');

                // Send weather data to the server
                sendToServer('save_weather_data.php', {
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

// Update weather data
document.getElementById('update-weather').addEventListener('click', () => {
    const updatedWeather = {
        temperature: document.getElementById('new-temperature').value,
        description: document.getElementById('new-weather-description').value,
        humidity: document.getElementById('new-humidity').value,
        wind_speed: document.getElementById('new-wind-speed').value
    };

    // Send updated weather data to the server
    sendToServer('update_data.php', { climate_data: JSON.stringify(updatedWeather) })
        .then(() => {
            document.getElementById('temp-div').innerHTML = `Temperature: ${updatedWeather.temperature}°F`;
            document.getElementById('weather-info').innerHTML = `
                <p>Weather: ${updatedWeather.description}</p>
                <p>Humidity: ${updatedWeather.humidity}%</p>
                <p>Wind Speed: ${updatedWeather.wind_speed} mph</p>
            `;
            document.getElementById('temp-div').classList.add('fade-in');
            document.getElementById('weather-info').classList.add('fade-in');
        })
        .catch(error => console.error('Error updating weather data:', error));
});

// Fetch NASA Astronomy Picture of the Day (APOD)
document.getElementById('fetch-astronomy').addEventListener('click', () => {
    fetch(nasaApiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('apod-title').innerHTML = `Title: ${data.title}`;
            document.getElementById('apod-description').innerHTML = `Explanation: ${data.explanation}`;
            document.getElementById('apod-image').src = data.url;
            document.getElementById('apod-image').style.display = 'block';

            // Apply fade-in animation to display elements
            document.getElementById('apod-title').classList.add('fade-in');
            document.getElementById('apod-description').classList.add('fade-in');

            // Send APOD data to the server
            sendToServer('save_astronomy_data.php', {
                title: data.title,
                explanation: data.explanation,
                image_url: data.url
            });
        })
        .catch(error => console.error('Error fetching APOD data:', error));
});

// Update NASA APOD data
document.getElementById('update-apod').addEventListener('click', () => {
    const titleInput = document.getElementById('new-apod-title');
    const explanationInput = document.getElementById('new-apod-description');
    
    if (titleInput && explanationInput) {
        const updatedAstronomy = {
            title: titleInput.value,
            explanation: explanationInput.value
        };

        // Send updated APOD data to the server
        sendToServer('update_data.php', { space_data: JSON.stringify(updatedAstronomy) })
            .then(() => {
                document.getElementById('apod-title').innerHTML = `Title: ${updatedAstronomy.title}`;
                document.getElementById('apod-description').innerHTML = `Explanation: ${updatedAstronomy.explanation}`;
                document.getElementById('apod-title').classList.add('fade-in');
                document.getElementById('apod-description').classList.add('fade-in');
            })
            .catch(error => console.error('Error updating APOD data:', error));
    } else {
        console.error('Input fields for APOD update are missing.');
    }
});

// Function to send data to the server via POST
function sendToServer(url, data) {
    return fetch(url, {
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
