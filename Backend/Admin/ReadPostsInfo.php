<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    include_once("../Configuration/Database.php");
    include_once("../Models/Post.php");

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $userComments=new Post($database);
    $userComments->getInfoForAdmin();
?>