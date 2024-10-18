<?php
$mysqli = new mysqli("localhost", "root", "Pranay36951!!", "myappdb");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

// Validate required data fields
if (isset($data['temperature'], $data['description'], $data['humidity'], $data['wind_speed'])) {
    $stmt = $mysqli->prepare("INSERT INTO climate_data (temperature, description, humidity, wind_speed) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssdd", $data['temperature'], $data['description'], $data['humidity'], $data['wind_speed']);

    if ($stmt->execute()) {
        echo "Climate data saved successfully!";
    } else {
        echo "Error saving climate data.";
    }

    $stmt->close();
} else {
    echo "Invalid input data.";
}

$mysqli->close();
?>
