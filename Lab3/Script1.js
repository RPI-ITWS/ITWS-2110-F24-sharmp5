// API keys
const apiKey = '3b4766a1ad259635f0e86e54694c9c73';
const nasaApiKey = 'J6MeTQuf5191Gf0BMAT1uj4CdScbuk5WgjtvzQXn';

// Variable to track data to load in popup
let loadDataType = null;

// Utility function to add event listeners with error checking
function addListener(selector, event, handler) {
    const element = document.getElementById(selector);
    if (element) {
        element.addEventListener(event, handler);
    } else {
        console.error(`Element with ID "${selector}" not found.`);
    }
}

// Send Data to Server function
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

// Fetch Weather Data
addListener('fetch-weather', 'click', () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=3b4766a1ad259635f0e86e54694c9c73")
        .then(response => response.json())
        .then(data => {
            const temperatureF = ((data.main.temp - 273.15) * 9/5) + 32;
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
        })
        .catch(error => console.error('Error fetching weather data:', error));
});

// Fetch Astronomy Data from NASA API
addListener('fetch-astronomy', 'click', () => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('apod-image').src = data.url;
            document.getElementById('apod-title').innerHTML = `Title: ${data.title}`;
            document.getElementById('apod-description').innerHTML = `Explanation: ${data.explanation}`;
        })
        .catch(error => console.error('Error fetching APOD data:', error));
});

// Show Popup Function
function showPopup() {
    document.getElementById('popup-container').style.display = 'flex';
}

// Hide Popup Function
function hidePopup() {
    document.getElementById('popup-container').style.display = 'none';
}

// Handle Update Buttons (Weather and APOD)
addListener('update-weather', 'click', () => {
    const newTemperature = document.getElementById('new-temperature').value;
    const newDescription = document.getElementById('new-weather-description').value;
    const newHumidity = document.getElementById('new-humidity').value;
    const newWindSpeed = document.getElementById('new-wind-speed').value;

    sendToServer('update_data.php', {
        table: 'weather_data',
        data: { temperature: newTemperature, description: newDescription, humidity: newHumidity, wind_speed: newWindSpeed }
    });

    loadDataType = 'weather';
    showPopup();
});

addListener('update-apod', 'click', () => {
    const newApodTitle = document.getElementById('new-apod-title').value;
    const newApodDescription = document.getElementById('new-apod-description').value;

    sendToServer('update_data.php', {
        table: 'astronomy_data',
        data: { title: newApodTitle, explanation: newApodDescription }
    });

    loadDataType = 'astronomy';
    showPopup();
});

// Load Specific Data from Database
function loadSpecificData() {
    fetch('load_data.php')
        .then(response => response.json())
        .then(data => {
            if (loadDataType === 'weather' && data.weather_data) {
                const weather = data.weather_data;
                document.getElementById('temp-div').innerHTML = `Temperature: ${weather.temperature}°F`;
                document.getElementById('weather-info').innerHTML = `
                    <p>Weather: ${weather.description}</p>
                    <p>Humidity: ${weather.humidity}%</p>
                    <p>Wind Speed: ${weather.wind_speed} mph</p>
                `;
            } else if (loadDataType === 'astronomy' && data.astronomy_data) {
                const astronomy = data.astronomy_data;
                document.getElementById('apod-image').src = astronomy.image_url;
                document.getElementById('apod-title').innerHTML = `Title: ${astronomy.title}`;
                document.getElementById('apod-description').innerHTML = `Explanation: ${astronomy.explanation}`;
            }
        })
        .catch(error => console.error('Error loading data from the database:', error));
}

// Attach listeners to popup buttons
addListener('popup-load-db', 'click', () => {
    loadSpecificData();
    hidePopup();
});
addListener('popup-close', 'click', hidePopup);
addListener('load-from-db', 'click', () => {
    loadDataFromDatabase();
});

document.getElementById('fetch-weather').addEventListener('click', () => {
    document.getElementById('weather-icon').style.display = 'block';
    document.getElementById('temp-div').style.display = 'block';
    document.getElementById('weather-info').style.display = 'block';
    // fetch weather data...
});

document.getElementById('fetch-astronomy').addEventListener('click', () => {
    document.getElementById('apod-image').style.display = 'block';
    document.getElementById('apod-title').style.display = 'block';
    document.getElementById('apod-description').style.display = 'block';
    // fetch astronomy data...
});

