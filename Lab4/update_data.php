<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = 'localhost';
$user = 'root';
$password = 'Pranay36951!!';
$dbname = 'myappdb';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['climate_data'])) {
    $climateData = json_decode($data['climate_data'], true);
    
    if (isset($climateData['temperature'], $climateData['description'], $climateData['humidity'], $climateData['wind_speed'])) {
        $temperature = $conn->real_escape_string($climateData['temperature']);
        $description = $conn->real_escape_string($climateData['description']);
        $humidity = $conn->real_escape_string($climateData['humidity']);
        $wind_speed = $conn->real_escape_string($climateData['wind_speed']);

        $sql = "UPDATE climate_data SET temperature='$temperature', description='$description', humidity='$humidity', wind_speed='$wind_speed' ORDER BY id DESC LIMIT 1";
        if ($conn->query($sql) === TRUE) {
            echo "Climate data updated successfully!";
        } else {
            echo "Error updating climate data: " . $conn->error;
        }
    } else {
        echo "Invalid climate data input.";
    }
} elseif (isset($data['space_data'])) {
    $spaceData = json_decode($data['space_data'], true);
    
    if (isset($spaceData['title'], $spaceData['explanation'], $spaceData['image_url'])) {
        $title = $conn->real_escape_string($spaceData['title']);
        $explanation = $conn->real_escape_string($spaceData['explanation']);
        $image_url = $conn->real_escape_string($spaceData['image_url']);

        $sql = "UPDATE space_data SET title='$title', explanation='$explanation', image_url='$image_url' ORDER BY id DESC LIMIT 1";
        if ($conn->query($sql) === TRUE) {
            echo "Space data updated successfully!";
        } else {
            echo "Error updating space data: " . $conn->error;
        }
    } else {
        echo "Invalid space data input.";
    }
} else {
    echo "Invalid data format.";
}

$conn->close();
?>
