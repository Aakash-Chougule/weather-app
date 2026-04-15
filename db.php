<?php
$host = "sql100.infinityfree.com";
$user = "if0_41667748";
$password = "aakashrorosing1";
$database = "if0_41667748_weatherdb";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>