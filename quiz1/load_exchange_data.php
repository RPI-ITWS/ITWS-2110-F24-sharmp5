<?php
$mysqli = new mysqli("localhost", "root", "Pranay36951!!", "myappdb");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$result = $mysqli->query("SELECT * FROM exchange_data ORDER BY id DESC LIMIT 1");
$exchangeData = $result->fetch_assoc();

$rates = json_decode($exchangeData['rates'], true);

header('Content-Type: application/json');
echo json_encode(['base' => $exchangeData['base'], 'date' => $exchangeData['date'], 'rates' => $rates]);

$mysqli->close();
?>

