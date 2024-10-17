<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = 'localhost';
$user = 'root';
$password = 'Pranay36951!!';
$dbname = 'weatherastronomydb';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['weather_data'])) {
    $weatherData = json_decode($data['weather_data'], true);
    
    if (isset($weatherData['temperature'], $weatherData['description'], $weatherData['humidity'], $weatherData['wind_speed'])) {
        $temperature = $conn->real_escape_string($weatherData['temperature']);
        $description = $conn->real_escape_string($weatherData['description']);
        $humidity = $conn->real_escape_string($weatherData['humidity']);
        $wind_speed = $conn->real_escape_string($weatherData['wind_speed']);

        $sql = "UPDATE weather_data SET temperature='$temperature', description='$description', humidity='$humidity', wind_speed='$wind_speed' ORDER BY id DESC LIMIT 1";
        if ($conn->query($sql) === TRUE) {
            echo "Weather data updated successfully!";
        } else {
            echo "Error updating weather data: " . $conn->error;
        }
    } else {
        echo "Invalid weather data input.";
    }
} if (isset($data['astronomy_data'])) {
    $astronomyData = json_decode($data['astronomy_data'], true);
    $title = isset($astronomyData['title']) ? $conn->real_escape_string($astronomyData['title']) : '';
    $explanation = isset($astronomyData['explanation']) ? $conn->real_escape_string($astronomyData['explanation']) : '';
    $image_url = isset($astronomyData['image_url']) ? $conn->real_escape_string($astronomyData['image_url']) : '';

    if (!empty($title) && !empty($explanation) && !empty($image_url)) {
        $sql = "UPDATE astronomy_data SET title='$title', explanation='$explanation', image_url='$image_url' WHERE id=1";
        if ($conn->query($sql) === TRUE) {
            echo "Astronomy data updated successfully!";
        } else {
            echo "Error updating astronomy data: " . $conn->error;
        }
    } else {
        echo "Invalid astronomy data input.";
    }
}

$conn->close();
?>
