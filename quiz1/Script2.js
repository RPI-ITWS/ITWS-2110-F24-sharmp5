const weatherApiKey = '3b4766a1ad259635f0e86e54694c9c73';
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=42.73&lon=-73.68&appid=${weatherApiKey}`;

// Ensure the DOM is fully loaded before running
document.addEventListener('DOMContentLoaded', () => {

    // Fetch weather data from OpenWeatherMap
    document.getElementById('fetch-weather').addEventListener('click', () => {
        fetch(weatherApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.main && data.weather && data.weather[0]) {
                    const temperatureF = ((data.main.temp - 273.15) * 9 / 5) + 32;
                    const iconCode = data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                    // Display weather data
                    document.getElementById('temp-div').innerHTML = `Temperature: ${temperatureF.toFixed(2)}°F`;
                    document.getElementById('weather-info').innerHTML = `
                        Weather: ${data.weather[0].description}<br>
                        Humidity: ${data.main.humidity}%<br>
                        Wind Speed: ${(data.wind.speed * 2.23694).toFixed(2)} mph
                    `;
                    document.getElementById('weather-icon').src = iconUrl;
                    document.getElementById('weather-icon').alt = data.weather[0].description;
                    document.getElementById('weather-icon').style.display = 'block';

                    // Send weather data to the server
                    sendToServer('save_weather_data.php', {
                        temperature: temperatureF.toFixed(2),
                        description: data.weather[0].description,
                        humidity: data.main.humidity,
                        wind_speed: (data.wind.speed * 2.23694).toFixed(2)
                    });
                }
            })
            .catch(error => console.error('Error fetching weather data:', error));
    });

    // Fetch exchange rates from Frankfurter API
    document.getElementById('fetch-exchange').addEventListener('click', () => {
        fetch('https://api.frankfurter.app/latest?base=USD')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let rateInfo = `Base Currency: ${data.base}<br>Date: ${data.date}<br><br>`;
                for (const [currency, value] of Object.entries(data.rates)) {
                    rateInfo += `${currency}: ${value}<br>`;
                }
                document.getElementById('exchange-info').innerHTML = rateInfo;

                // Send exchange data to the server
                sendToServer('save_exchange_data.php', data);
            })
            .catch(error => console.error('Error fetching exchange rates:', error));
    });

    // Fetch NASA APOD data
    document.getElementById('fetch-astronomy').addEventListener('click', () => {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('apod-title').innerHTML = `Title: ${data.title}`;
                document.getElementById('apod-description').innerHTML = `Explanation: ${data.explanation}`;
                document.getElementById('apod-image').src = data.url;
                document.getElementById('apod-image').style.display = 'block';

                // Send APOD data to the server
                sendToServer('save_apod_data.php', data);
            })
            .catch(error => console.error('Error fetching NASA APOD:', error));
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Server response:', data);
        })
        .catch(error => {
            console.error('Error sending data to server:', error);
        });
    }
});
