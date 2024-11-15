<?php
$mysqli = new mysqli("localhost", "root", "your_password", "myquizdb");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['main']['temp'], $data['weather'][0]['description'], $data['main']['humidity'], $data['wind']['speed'])) {
    $temperature = ($data['main']['temp'] - 273.15) * 9 / 5 + 32; // Convert Kelvin to Fahrenheit
    $description = $mysqli->real_escape_string($data['weather'][0]['description']);
    $humidity = $data['main']['humidity'];
    $wind_speed = $data['wind']['speed'] * 2.23694; // Convert m/s to mph

    $stmt = $mysqli->prepare("INSERT INTO climate_data (temperature, description, humidity, wind_speed) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("dsdd", $temperature, $description, $humidity, $wind_speed);

    if ($stmt->execute()) {
        echo "Weather data saved successfully!";
    } else {
        echo "Error saving weather data: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Invalid input data.";
}

$mysqli->close();
?>
