<?php
$mysqli = new mysqli("localhost", "root", "your_password", "myquizdb");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

// Update weather data
if (isset($data['weather_data'])) {
    $weatherData = json_decode($data['weather_data'], true);

    if (isset($weatherData['temperature'], $weatherData['description'], $weatherData['humidity'], $weatherData['wind_speed'])) {
        $temperature = $mysqli->real_escape_string($weatherData['temperature']);
        $description = $mysqli->real_escape_string($weatherData['description']);
        $humidity = $mysqli->real_escape_string($weatherData['humidity']);
        $wind_speed = $mysqli->real_escape_string($weatherData['wind_speed']);

        $sql = "UPDATE climate_data SET temperature='$temperature', description='$description', humidity='$humidity', wind_speed='$wind_speed' ORDER BY id DESC LIMIT 1";
        if ($mysqli->query($sql) === TRUE) {
            echo "Weather data updated successfully!";
        } else {
            echo "Error updating weather data: " . $mysqli->error;
        }
    } else {
        echo "Invalid weather data input.";
    }
}

// Update APOD data
if (isset($data['apod_data'])) {
    $apodData = json_decode($data['apod_data'], true);

    if (isset($apodData['title'], $apodData['explanation'], $apodData['image_url'])) {
        $title = $mysqli->real_escape_string($apodData['title']);
        $explanation = $mysqli->real_escape_string($apodData['explanation']);
        $image_url = $mysqli->real_escape_string($apodData['image_url']);

        $sql = "UPDATE apod_data SET title='$title', explanation='$explanation', image_url='$image_url' ORDER BY id DESC LIMIT 1";
        if ($mysqli->query($sql) === TRUE) {
            echo "APOD data updated successfully!";
        } else {
            echo "Error updating APOD data: " . $mysqli->error;
        }
    } else {
        echo "Invalid APOD data input.";
    }
}

$mysqli->close();
?>
