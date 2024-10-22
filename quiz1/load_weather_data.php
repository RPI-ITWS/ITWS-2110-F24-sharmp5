<?php
$mysqli = new mysqli("localhost", "root", "Pranay36951!!", "myquizdb");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Retrieve the latest weather data
$result = $mysqli->query("SELECT * FROM climate_data ORDER BY id DESC LIMIT 1");
$weatherData = $result->fetch_assoc();

// Output weather data as JSON
header('Content-Type: application/json');
echo json_encode([
    'temperature' => $weatherData['temperature'],
    'description' => $weatherData['description'],
    'humidity' => $weatherData['humidity'],
    'wind_speed' => $weatherData['wind_speed']
]);

$mysqli->close();
?>
