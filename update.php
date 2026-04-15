<?php
include "db.php";

$id = $_POST['id'];
$temp = $_POST['temp'];

$conn->query("UPDATE weather_data SET temperature='$temp' WHERE id=$id");

echo "Updated!";
?>