<?php
require_once('conn.php');

$_POST = json_decode(file_get_contents("php://input"), true);

$username = $_POST['username'];
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE username = '$username'";
$stmt = $con->query($query);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if (!empty($result)){
    echo "exists";
} else {
    $query = "INSERT INTO users VALUES (:id, :firstName, :lastName, :username, :email, :phone, :password, :loginRoute)";
    $stmt = $con->prepare($query);
    $stmt->execute(array(':id' => null, ':firstName' => $fname, ':lastName' => $lname, ':username' => $username, ':email' => $email, ':phone' => $phone, ':password' => $password, ':loginRoute' => "normal"));
    echo "Success";
}

?>