<?php
require_once('conn.php');

$carrier = $_GET['type'];
$query = "SELECT * FROM drivers WHERE carrier = '$carrier'";
$stmt = $con->query($query);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
?>