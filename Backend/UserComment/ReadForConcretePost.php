<?php

    $http_origin = $_SERVER['HTTP_ORIGIN'];

    if ($http_origin == "http://localhost:3001" || $http_origin == "https://andresrodriguez55.github.io")
    {  
        header("Access-Control-Allow-Origin: $http_origin");
    }

    header("Content-Type: application/json");

    include_once("../Configuration/Database.php");
    include_once("../Models/UserComment.php");

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $comments=new UserComment($database);

    $comments->PostID=isset($_GET["PostID"]) ? $_GET["PostID"] : die();

    $comments->getForConcretePost();

?>