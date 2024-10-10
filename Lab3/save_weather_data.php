<?php
$mysqli = new mysqli("localhost", "root", "Pranay36951!!", "weatherastronomydb");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $mysqli->prepare("INSERT INTO weather_data (temperature, description, humidity, wind_speed) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssdd", $data['temperature'], $data['description'], $data['humidity'], $data['wind_speed']);

if ($stmt->execute()) {
    echo "Weather data saved successfully!";
} else {
    echo "Error saving weather data.";
}

$stmt->close();
$mysqli->close();
?>
