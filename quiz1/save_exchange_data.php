<?php
$mysqli = new mysqli("localhost", "root", "Pranay36951!!", "myappdb");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$apiUrl = 'https://api.frankfurter.app/latest';

$exchangeData = file_get_contents($apiUrl);
$jsonData = json_decode($exchangeData, true);

// Prepare SQL query to insert JSON data into database
$stmt = $mysqli->prepare("INSERT INTO exchange_data (base, date, rates) VALUES (?, ?, ?)");
$base = $jsonData['base'];
$date = $jsonData['date'];
$rates = json_encode($jsonData['rates']); // Store rates as JSON string

$stmt->bind_param("sss", $base, $date, $rates);

if ($stmt->execute()) {
    echo "Exchange rate data saved successfully!";
} else {
    echo "Error saving exchange rate data.";
}

$stmt->close();
$mysqli->close();
?>
