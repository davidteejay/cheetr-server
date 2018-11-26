<?php
require_once('conn.php');

$_POST = json_decode(file_get_contents("php://input"), true);

$id = $_POST['id'];

$query = "UPDATE orders SET status = 'cancelled' WHERE id = :id";
$stmt = $con->prepare($query);
$stmt->execute(array(':id' => $id));

echo 'Order cancelled';
?>
