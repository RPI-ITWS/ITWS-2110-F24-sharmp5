<?php
$mysqli = new mysqli("localhost", "root", "your_password", "myquizdb");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['title'], $data['explanation'], $data['url'])) {
    $title = $mysqli->real_escape_string($data['title']);
    $explanation = $mysqli->real_escape_string($data['explanation']);
    $image_url = $mysqli->real_escape_string($data['url']);

    $stmt = $mysqli->prepare("INSERT INTO apod_data (title, explanation, image_url) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $explanation, $image_url);

    if ($stmt->execute()) {
        echo "APOD data saved successfully!";
    } else {
        echo "Error saving APOD data: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Invalid input data.";
}

$mysqli->close();
?>
