<?php
include "db.php";

$id = $_GET['id'];

$conn->query("DELETE FROM weather_data WHERE id=$id");
?>