<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    include_once("../Configuration/Database.php");
    include_once("../Models/Post.php");

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $post=new Post($database);

    $post->ID=isset($_GET["ID"]) ? $_GET["ID"] : die();

    $post->getConcrete();

    $database->disconnect();
?>