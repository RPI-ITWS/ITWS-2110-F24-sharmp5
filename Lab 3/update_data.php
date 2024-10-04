<?php
// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "weatherastronomydb";

// Create a new MySQLi connection
$mysqli = new mysqli($servername, $username, $password, $dbname);

// Check for a connection error
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Get the incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Determine which table to update
$table = $data['table'];
$updateData = $data['data'];

// Prepare and execute the update query based on the specified table
if ($table === 'weather_data') {
    $stmt = $mysqli->prepare("UPDATE weather_data SET temperature = ?, description = ?, humidity = ?, wind_speed = ? ORDER BY id DESC LIMIT 1");
    $stmt->bind_param(
        "ssss",
        $updateData['temperature'],
        $updateData['description'],
        $updateData['humidity'],
        $updateData['wind_speed']
    );
} elseif ($table === 'astronomy_data') {
    $stmt = $mysqli->prepare("UPDATE astronomy_data SET title = ?, explanation = ? ORDER BY id DESC LIMIT 1");
    $stmt->bind_param(
        "ss",
        $updateData['title'],
        $updateData['explanation']
    );
}

// Execute the prepared statement and check for errors
if ($stmt->execute()) {
    echo "Data updated successfully!";
} else {
    echo "Error updating data: " . $stmt->error;
}

// Close the statement and database connection
$stmt->close();
$mysqli->close();
?>
