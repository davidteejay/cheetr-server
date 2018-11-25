<?php
require_once('conn.php');

$_POST = json_decode(file_get_contents("php://input"), true);

$userId = $_POST['userId'];
$driverId = $_POST['driverId'];
$date = $_POST['date'];
$amount = $_POST['amount'];

$query = "INSERT INTO invoices (userId, driverId, date, amount) VALUES (:userId, :driverId, :date, :amount)";
$stmt = $con->prepare($query);
$stmt->execute(array(':userId' => $userId, ':driverId' => $driverId, ':date' => $date, ':amount' => $amount));

echo 'Invoice sent';
?>
