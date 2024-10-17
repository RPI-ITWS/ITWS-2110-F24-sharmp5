<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = 'localhost';
$user = 'root';
$password = 'Pranay36951!!';
$dbname = 'weatherastronomydb';

// Connect to MySQL database
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Receive and decode JSON data
$data = json_decode(file_get_contents('php://input'), true);

// Handle the update based on the type of data
if (isset($data['astronomy_data'])) {
    $astronomyData = json_decode($data['astronomy_data'], true);

    // Check if all required fields are present
    if (isset($astronomyData['title']) && isset($astronomyData['explanation']) && isset($astronomyData['image_url'])) {
        $title = $conn->real_escape_string($astronomyData['title']);
        $explanation = $conn->real_escape_string($astronomyData['explanation']);
        $image_url = $conn->real_escape_string($astronomyData['image_url']);

        $sql = "UPDATE astronomy_data SET title='$title', explanation='$explanation', image_url='$image_url' WHERE id=1";
        if ($conn->query($sql) === TRUE) {
            echo "Astronomy data updated successfully!";
        } else {
            echo "Error updating astronomy data: " . $conn->error;
        }
    } else {
        echo "Invalid astronomy data input.";
        error_log("Astronomy data missing fields: " . print_r($astronomyData, true)); // Debugging log
    }
} else {
    echo "Invalid data format.";
}
$conn->close();
?>
