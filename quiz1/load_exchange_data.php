<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$mysqli = new mysqli("localhost", "root", "Pranay36951!!", "myquizdb");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$result = $mysqli->query("SELECT * FROM exchange_data ORDER BY id DESC LIMIT 1");
if ($result) {
    $exchangeData = $result->fetch_assoc();

    $rates = json_decode($exchangeData['rates'], true);

    // Output exchange data as JSON
    header('Content-Type: application/json');
    echo json_encode([
        'base' => $exchangeData['base'],
        'date' => $exchangeData['date'],
        'rates' => $rates
    ]);
} else {
    echo "Error: " . $mysqli->error;
}

$mysqli->close();
?>
