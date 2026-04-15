<?php
include "db.php";

if (isset($_GET['city'])) {
    $city = $_GET['city'];
    $result = $conn->query("SELECT * FROM weather_data WHERE city='$city'");
} else {
    $result = $conn->query("SELECT * FROM weather_data GROUP BY city");
}

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>