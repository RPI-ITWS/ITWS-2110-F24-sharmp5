<?php
$mysqli = new mysqli("localhost", "root", "your_password", "myquizdb");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Fetch the latest weather data
$weather_result = $mysqli->query("SELECT * FROM climate_data ORDER BY id DESC LIMIT 1");
$weather_data = $weather_result->fetch_assoc();

// Fetch the latest APOD data
$apod_result = $mysqli->query("SELECT * FROM apod_data ORDER BY id DESC LIMIT 1");
$apod_data = $apod_result->fetch_assoc();

// Combine and output the data as JSON
$response = [
    "weather_data" => $weather_data,
    "apod_data" => $apod_data
];

header('Content-Type: application/json');
echo json_encode($response);

$mysqli->close();
?>
