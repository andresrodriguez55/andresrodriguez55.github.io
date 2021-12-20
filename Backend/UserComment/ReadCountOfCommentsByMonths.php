<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    include_once("../Configuration/Database.php");
    include_once("../Models/UserComment.php");

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $comments=new UserComment($database);

    $comments->getCountsByMonths();
?>