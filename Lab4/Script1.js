const weatherApiKey = '3b4766a1ad259635f0e86e54694c9c73';
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=42.73&lon=-73.68&appid=${weatherApiKey}`;
const frankfurterApiUrl = 'https://api.frankfurter.app/latest';
const nasaApiKey = 'DEMO_KEY';
const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`;

// Fetch Weather Data
document.getElementById('fetch-weather').addEventListener('click', () => {
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            const temperatureF = ((data.main.temp - 273.15) * 9/5 + 32).toFixed(2);
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            
            document.getElementById('temp-div').innerText = `Temperature: ${temperatureF}°F`;
            document.getElementById('weather-info').innerHTML = `
                Weather: ${data.weather[0].description}<br>
                Humidity: ${data.main.humidity}%<br>
                Wind Speed: ${(data.wind.speed * 2.237).toFixed(2)} mph
            `;
            document.getElementById('weather-icon').src = iconUrl;
            document.getElementById('weather-icon').style.display = 'block';

            // Add Timestamp
            const timestamp = new Date().toLocaleString();
            document.getElementById('temp-div').insertAdjacentHTML('afterend', `<p>Last Updated: ${timestamp}</p>`);
        })
        .catch(err => console.error(err));
});

// Fetch Exchange Rates
document.getElementById('fetch-exchange').addEventListener('click', () => {
    fetch(frankfurterApiUrl)
        .then(response => response.json())
        .then(data => {
            let rates = `<p>Base Currency: ${data.base}</p><p>Date: ${data.date}</p>`;
            for (const [currency, rate] of Object.entries(data.rates)) {
                rates += `<p>${currency}: ${rate}</p>`;
            }
            document.getElementById('exchange-info').innerHTML = rates;

            // Add Timestamp
            const timestamp = new Date().toLocaleString();
            document.getElementById('exchange-info').insertAdjacentHTML('afterend', `<p>Last Updated: ${timestamp}</p>`);
        })
        .catch(err => console.error(err));
});

// Fetch NASA APOD Data
document.getElementById('fetch-astronomy').addEventListener('click', () => {
    fetch(nasaApiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('apod-title').innerText = `Title: ${data.title}`;
            document.getElementById('apod-description').innerText = `Explanation: ${data.explanation}`;
            document.getElementById('apod-image').src = data.url;
            document.getElementById('apod-image').style.display = 'block';

            // Add Timestamp
            const timestamp = new Date().toLocaleString();
            document.getElementById('apod-title').insertAdjacentHTML('afterend', `<p>Last Updated: ${timestamp}</p>`);
        })
        .catch(err => console.error(err));
});
