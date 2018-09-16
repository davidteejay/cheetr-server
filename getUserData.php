<?php
require_once('conn.php');

$username = $_GET['username'];

$query = "SELECT * FROM users WHERE username = '$username'";
$stmt = $con->query($query);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($result);
?>