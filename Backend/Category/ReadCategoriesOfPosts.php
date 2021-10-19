<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    include_once("../Configuration/Database.php");
    include_once("../Models/Category.php");

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $categories=new Category($database);
    $categories->getCategoriesOfPosts();
?>