<?php
$_POST = json_decode(file_get_contents("php://input"), true); // for JSON data
echo var_dump($_POST);

?>