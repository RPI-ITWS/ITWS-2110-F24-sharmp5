<?php
$mysqli = new mysqli("localhost", "root", "Pranay36951!!", "myappdb");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Fetch the latest climate data
$climate_result = $mysqli->query("SELECT * FROM climate_data ORDER BY id DESC LIMIT 1");
$climate_data = $climate_result->fetch_assoc();

// Fetch the latest space data
$space_result = $mysqli->query("SELECT * FROM space_data ORDER BY id DESC LIMIT 1");
$space_data = $space_result->fetch_assoc();

// Combine and output the data as JSON
$response = [
    "climate_data" => $climate_data,
    "space_data" => $space_data
];

header('Content-Type: application/json');
echo json_encode($response);

$mysqli->close();
?>
