<?php
require_once('conn.php');

$_POST = json_decode(file_get_contents("php://input"), true);

$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$stmt = $con->query($query);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if (count($result) === 0) $result = "{}";
echo json_encode($result);
?>