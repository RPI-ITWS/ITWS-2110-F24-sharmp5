<?php
header("Content-Type: application/json");

$mysqli = new mysqli("localhost", "root", "Pranay36951!!", "weatherastronomydb");

if ($mysqli->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $mysqli->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['temperature'], $data['description'], $data['humidity'], $data['wind_speed'])) {
    $stmt = $mysqli->prepare("INSERT INTO weather_data (temperature, description, humidity, wind_speed) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssdd", $data['temperature'], $data['description'], $data['humidity'], $data['wind_speed']);

    if ($stmt->execute()) {
        echo json_encode(["status" => "Weather data saved successfully!"]);
    } else {
        echo json_encode(["error" => "Error saving weather data: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid input data"]);
}

$mysqli->close();
?>
