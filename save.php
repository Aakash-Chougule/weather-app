<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$city = $data['city'];
$temp = $data['temp'];
$weather = $data['weather'];

$sql = "INSERT INTO weather_data (city, temperature, weather)
        VALUES ('$city', '$temp', '$weather')";

if ($conn->query($sql)) {
    echo "Saved successfully!";
} else {
    echo "Error";
}
?>