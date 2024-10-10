const apiKey = '3b4766a1ad259635f0e86e54694c9c73';
const city = 'Troy';
const state = 'NY';

fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=3b4766a1ad259635f0e86e54694c9c73")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        //convert temperature from to Fahrenheit
        const temperatureF = ((data.main.temp - 273.15) * 9/5) + 32;

        //wind speed from m/s to mph
        const windSpeedMph = (data.wind.speed * 2.23694).toFixed(2);

        //weather icon code
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        //weather data
        document.getElementById('temp-div').innerHTML = `Temperature: ${temperatureF.toFixed(2)}°F`;
        document.getElementById('weather-info').innerHTML = `
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${windSpeedMph} mph</p>
        `;
        document.getElementById('weather-icon').src = iconUrl;
        document.getElementById('weather-icon').alt = data.weather[0].description;
    })
    .catch(error => {
        console.error('Error fetching the weather data:', error);
        document.getElementById('weather-container').innerHTML = `<p>Failed to load weather data.</p>`;
    });
//nasa API
const nasaApiKey = 'J6MeTQuf5191Gf0BMAT1uj4CdScbuk5WgjtvzQXn';

fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //image, title, and description
        document.getElementById('apod-image').src = data.url;
        document.getElementById('apod-title').innerHTML = `Title: ${data.title}`;
        document.getElementById('apod-description').innerHTML = `Explanation: ${data.explanation}`;
    })
    .catch(error => {
        console.error('Error fetching the astronomy data:', error);
        document.getElementById('astronomy-container').innerHTML = `<p>Failed to load astronomy data.</p>`;
    });