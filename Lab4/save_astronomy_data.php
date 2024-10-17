<?php
header("Content-Type: application/json");

$mysqli = new mysqli("localhost", "root", "Pranay36951!!", "weatherastronomydb");

if ($mysqli->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $mysqli->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['title'], $data['explanation'], $data['image_url'])) {
    $stmt = $mysqli->prepare("INSERT INTO astronomy_data (title, explanation, image_url) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $data['title'], $data['explanation'], $data['image_url']);

    if ($stmt->execute()) {
        echo json_encode(["status" => "Astronomy data saved successfully!"]);
    } else {
        echo json_encode(["error" => "Error saving astronomy data: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid input data"]);
}

$mysqli->close();
?>

