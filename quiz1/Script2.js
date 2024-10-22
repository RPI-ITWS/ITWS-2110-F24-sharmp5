const weatherApiKey = '3b4766a1ad259635f0e86e54694c9c73';
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=42.73&lon=-73.68&appid=${weatherApiKey}`;

    // Fetch weather data from OpenWeatherMap
    document.getElementById('fetch-weather').addEventListener('click', () => {
        fetch(weatherApiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.main && data.weather && data.weather[0]) {
                    const temperatureF = ((data.main.temp - 273.15) * 9 / 5) + 32;
                    const iconCode = data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                    // Display weather data in the UI
                    document.getElementById('temp-div').innerHTML = `Temperature: ${temperatureF.toFixed(2)}°F`;
                    document.getElementById('weather-info').innerHTML = `
                        <p>Weather: ${data.weather[0].description}</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${(data.wind.speed * 2.23694).toFixed(2)} mph</p>
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
                } else {
                    console.error("Missing data in weather API response", data);
                }
            })
            .catch(error => console.error('Error fetching weather data:', error));
    });

    // Fetch exchange rate data from Frankfurter API
    document.getElementById('fetch-exchange').addEventListener('click', () => {
        fetch('load_exchange_data.php')
            .then(response => response.json())
            .then(data => {
                const rates = data.rates;
                let rateInfo = `Base Currency: ${data.base}<br>Date: ${data.date}<br><br>`;
                for (const [currency, value] of Object.entries(rates)) {
                    rateInfo += `${currency}: ${value}<br>`;
                }
                document.getElementById('exchange-info').innerHTML = rateInfo;
            });
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
