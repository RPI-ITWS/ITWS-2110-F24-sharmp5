<?php
// Database connection details
$host = "localhost"; 
$username = "root"; 
$password = "Pranay36951!!";  
$dbname = "weatherastronomydb"; 

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Capture and update data based on user input
$temperature = $_POST['temperature'];
$description = $_POST['description'];
$humidity = $_POST['humidity'];
$wind_speed = $_POST['wind_speed'];

$sql = "UPDATE weather_data SET temperature='$temperature', description='$description', humidity='$humidity', wind_speed='$wind_speed' WHERE id=1";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
