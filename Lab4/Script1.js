const weatherApiKey = '3b4766a1ad259635f0e86e54694c9c73';
const nasaApiKey = 'DEMO_KEY';
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=42.73&lon=-73.68&appid=${weatherApiKey}`;
const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`;

// Fetch Weather Data
fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => {
        const tempF = ((data.main.temp - 273.15) * 9 / 5) + 32;
        document.getElementById('temp-div').textContent = `Temperature: ${tempF.toFixed(2)}°F`;
        document.getElementById('weather-info').innerHTML = `
            Weather: ${data.weather[0].description}<br>
            Humidity: ${data.main.humidity}%<br>
            Wind Speed: ${(data.wind.speed * 2.23694).toFixed(2)} mph
        `;
        document.getElementById('last-updated-weather').textContent = `Last Updated: ${new Date().toLocaleString()}`;
    })
    .catch(console.error);

// Fetch NASA APOD Data
fetch(nasaApiUrl)
    .then(response => response.json())
    .then(data => {
        document.getElementById('apod-title').textContent = `Title: ${data.title}`;
        document.getElementById('apod-description').textContent = data.explanation;
        document.getElementById('apod-image').src = data.url;
        document.getElementById('last-updated-apod').textContent = `Last Updated: ${new Date().toLocaleString()}`;
    })
    .catch(console.error);

// Update Weather Data
document.getElementById('update-weather').addEventListener('click', () => {
    const newTemp = document.getElementById('new-temperature').value;
    const newDescription = document.getElementById('new-weather-description').value;
    const newHumidity = document.getElementById('new-humidity').value;
    const newWindSpeed = document.getElementById('new-wind-speed').value;

    document.getElementById('temp-div').textContent = `Temperature: ${newTemp}°F`;
    document.getElementById('weather-info').innerHTML = `
        Weather: ${newDescription}<br>
        Humidity: ${newHumidity}%<br>
        Wind Speed: ${newWindSpeed} mph
    `;
    document.getElementById('last-updated-weather').textContent = `Last Updated: ${new Date().toLocaleString()}`;
});

// Update NASA APOD Data
document.getElementById('update-apod').addEventListener('click', () => {
    const newTitle = document.getElementById('new-apod-title').value;
    const newDescription = document.getElementById('new-apod-description').value;

    document.getElementById('apod-title').textContent = `Title: ${newTitle}`;
    document.getElementById('apod-description').textContent = newDescription;
    document.getElementById('last-updated-apod').textContent = `Last Updated: ${new Date().toLocaleString()}`;
});
