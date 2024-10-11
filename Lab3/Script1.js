// OpenWeatherMap API configuration
const apiKey = '3b4766a1ad259635f0e86e54694c9c73';
const city = 'Troy';
const state = 'NY';

// Fetch weather data from OpenWeatherMap API
document.getElementById('fetch-weather').addEventListener('click', () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=3b4766a1ad259635f0e86e54694c9c73")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Convert temperature to Fahrenheit
            const temperatureF = ((data.main.temp - 273.15) * 9 / 5) + 32;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            // Display weather data
            document.getElementById('temp-div').innerHTML = `Temperature: ${temperatureF.toFixed(2)}°F`;
            document.getElementById('weather-info').innerHTML = `
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${(data.wind.speed * 2.23694).toFixed(2)} mph</p>
            `;
            document.getElementById('weather-icon').src = iconUrl;
            document.getElementById('weather-icon').alt = data.weather[0].description;

            // Send weather data to PHP for saving in the database
            sendToServer('save_weather_data.php', {
                temperature: temperatureF.toFixed(2),
                description: data.weather[0].description,
                humidity: data.main.humidity,
                wind_speed: (data.wind.speed * 2.23694).toFixed(2)
            });
        })
        .catch(error => console.error('Error fetching weather data:', error));
});

// NASA APOD API configuration
const nasaApiKey = 'J6MeTQuf5191Gf0BMAT1uj4CdScbuk5WgjtvzQXn';
document.getElementById('fetch-astronomy').addEventListener('click', () => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Display astronomy data
            document.getElementById('apod-image').src = data.url;
            document.getElementById('apod-title').innerHTML = `Title: ${data.title}`;
            document.getElementById('apod-description').innerHTML = `Explanation: ${data.explanation}`;

            // Send astronomy data to PHP for saving in the database
            sendToServer('save_astronomy_data.php', {
                title: data.title,
                explanation: data.explanation,
                image_url: data.url,
                date: data.date
            });
        })
        .catch(error => console.error('Error fetching astronomy data:', error));
});

// Function to send data to the server via POST
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
function loadDataFromDatabase() {
    fetch('load_data.php')
        .then(response => response.json())
        .then(data => {
            if (!data) {
                console.error('No data received from PHP');
                return;
            }

            // Display weather data from database
            const weather = data.weather_data;
            const temperatureF = weather.temperature;
            document.getElementById('temp-div').innerHTML = `Temperature: ${temperatureF}°F`;
            document.getElementById('weather-info').innerHTML = `
                <p>Weather: ${weather.description}</p>
                <p>Humidity: ${weather.humidity}%</p>
                <p>Wind Speed: ${weather.wind_speed} mph</p>
            `;

            // Display astronomy data from database
            const astronomy = data.astronomy_data;
            document.getElementById('apod-image').src = astronomy.image_url;
            document.getElementById('apod-title').innerHTML = `Title: ${astronomy.title}`;
            document.getElementById('apod-description').innerHTML = `Explanation: ${astronomy.explanation}`;
        })
        .catch(error => console.error('Error loading data from the database:', error));
}

// Update weather data with new input values
document.getElementById('update-weather').addEventListener('click', () => {
    const newTemperature = document.getElementById('new-temperature').value;
    const newDescription = document.getElementById('new-weather-description').value;
    const newHumidity = document.getElementById('new-humidity').value;
    const newWindSpeed = document.getElementById('new-wind-speed').value;

    sendToServer('update_data.php', {
        weather_data: JSON.stringify({
            temperature: newTemperature,
            description: newDescription,
            humidity: newHumidity,
            wind_speed: newWindSpeed
        })
    });
});

// Update astronomy data with new input values
document.getElementById('update-apod').addEventListener('click', () => {
    const newApodTitle = document.getElementById('new-apod-title').value;
    const newApodDescription = document.getElementById('new-apod-description').value;

    sendToServer('update_data.php', {
        astronomy_data: JSON.stringify({
            title: newApodTitle,
            explanation: newApodDescription
        })
    });
});

// Add event listener to load button
document.getElementById('load-from-db').addEventListener('click', loadDataFromDatabase);
