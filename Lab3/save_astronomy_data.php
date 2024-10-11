<?php
$mysqli = new mysqli("localhost", "root", "Pranay36951!!", "weatherastronomydb");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['title'], $data['explanation'], $data['image_url'])) {
    $stmt = $mysqli->prepare("INSERT INTO astronomy_data (title, explanation, image_url) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $data['title'], $data['explanation'], $data['image_url']);

    if ($stmt->execute()) {
        echo "Astronomy data saved successfully!";
    } else {
        echo "Error saving astronomy data.";
    }

    $stmt->close();
} else {
    echo "Invalid input data.";
}

$mysqli->close();
?>
