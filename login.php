<?php
require_once('conn.php');

$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$stmt = $con->query($query);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($result)
?>