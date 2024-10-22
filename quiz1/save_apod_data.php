<?php
// Connect to the MySQL database
$mysqli = new mysqli("localhost", "root", "password", "myquizdb");

// Check for connection errors
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Get the JSON data sent from the client-side JavaScript
$data = json_decode(file_get_contents("php://input"), true);

// Ensure required fields are available
if (isset($data['title'], $data['explanation'], $data['url'])) {
    $title = $data['title'];
    $explanation = $data['explanation'];
    $image_url = $data['url'];
    $date = date('Y-m-d'); // Store the current date

    // Prepare an SQL statement to insert the APOD data into the database
    $stmt = $mysqli->prepare("INSERT INTO apod_data (title, explanation, image_url, date) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $title, $explanation, $image_url, $date);

    // Execute the SQL query and check if it was successful
    if ($stmt->execute()) {
        echo "NASA APOD data saved successfully!";
    } else {
        echo "Error saving NASA APOD data.";
    }

    // Close the statement and connection
    $stmt->close();
} else {
    echo "Invalid input data.";
}

// Close the database connection
$mysqli->close();
?>
