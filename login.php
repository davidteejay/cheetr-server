<?php
require_once('conn.php');

$query = "SELECT * FROM users WHERE username={$_POST['username']} AND password={$_POST['password']}";
$stmt = $con->query($query);
$result = $stmt->fetcAll(PDO::FETCH_ASSOC);

echo json_encode($result)
?>