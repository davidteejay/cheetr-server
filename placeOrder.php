<?php
require_once('conn.php');

$_POST = json_decode(file_get_contents("php://input"), true);

$userId = $_POST['userId'];
$driverId = $_POST['driverId'];
$recipientName = $_POST['recipientName'];
$recipientPhone = $_POST['recipientPhone'];
$pickup = $_POST['pickup'];
$dropoff = $_POST['dropoff'];
$selectedPackage = $_POST['selectedPackage'];
$carrier = $_POST['carrier'];

$query = "INSERT INTO order (userId, driverId, recipientName, recipientPhone, pickup, dropoff, selectedPackage, carrier) VALUES (:userId, :driverId, :recipientName, :recipientPhone, :pickup, :dropoff, :selectedPackage, :carrier)";
$stmt = $con->prepare($query);
$stmt->execute(array(':userId' => $userId, ':driverId' => $driverId, ':recipientName' => $recipientName, ':recipientPhone' => $recipientPhone, ':pickup' => $pickup, ':dropoff' => $dropoff, ':selectedPackage' => $selectedPackage, ':carrier' => $carrier));

echo 'Order placed';
?>
