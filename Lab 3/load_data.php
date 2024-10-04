<?php
$mysqli = new mysqli("localhost", "root", "", "weatherastronomydb");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Fetch the latest weather data
$weather_result = $mysqli->query("SELECT * FROM weather_data ORDER BY id DESC LIMIT 1");
$weather_data = $weather_result->fetch_assoc();

// Fetch the latest astronomy data
$astronomy_result = $mysqli->query("SELECT * FROM astronomy_data ORDER BY id DESC LIMIT 1");
$astronomy_data = $astronomy_result->fetch_assoc();

// Combine and output the data as JSON
$response = [
    "weather_data" => $weather_data,
    "astronomy_data" => $astronomy_data
];

header('Content-Type: application/json');
echo json_encode($response);

$mysqli->close();
?>
