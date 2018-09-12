<?php
// The database connection file
$con = new PDO('mysql:host=localhost:3306;dbname=cheetrco_app', "cheetrco_tushh", "Brain.box8");
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>
