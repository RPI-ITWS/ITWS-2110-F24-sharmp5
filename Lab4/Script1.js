const weatherApiKey = '3b4766a1ad259635f0e86e54694c9c73';
const nasaApiKey = 'DEMO_KEY';
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`;
const tips = [
    "Did you know? The Earth’s atmosphere has layers, including the troposphere and stratosphere.",
    "The Moon is drifting away from the Earth by about 1.5 inches per year.",
    "Weather forecasting involves analyzing air pressure, temperature, and humidity.",
    "Astronauts see 16 sunrises and sunsets every day in space!",
    "The average lifespan of a cloud is about 10 minutes."
];

// Fetch Weather Data
document.getElementById('fetch-weather').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    fetch(`${weatherApiUrl}${location}&appid=${weatherApiKey}`)
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
            saveToLocalStorage(location);
        })
        .catch(console.error);
});

// Fetch NASA APOD Data
document.getElementById('fetch-astronomy').addEventListener('click', () => {
    fetch(nasaApiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('apod-title').textContent = `Title: ${data.title}`;
            document.getElementById('apod-description').textContent = data.explanation;
            document.getElementById('apod-image').src = data.url;
            document.getElementById('last-updated-apod').textContent = `Last Updated: ${new Date().toLocaleString()}`;
        })
        .catch(console.error);
});

// Display Educational Tip
document.getElementById('educational-tip').textContent = tips[Math.floor(Math.random() * tips.length)];

// Save Recent Searches
function saveToLocalStorage(search) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history = [search, ...history.slice(0, 4)];
    localStorage.setItem('searchHistory', JSON.stringify(history));
    renderSearchHistory();
}

// Render Recent Searches
function renderSearchHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const list = document.getElementById('search-history');
    list.innerHTML = history.map(item => `<li>${item}</li>`).join('');
}

// Initialize Recent Searches
renderSearchHistory();
