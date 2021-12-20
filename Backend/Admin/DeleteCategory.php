<?php
    header("Content-Type: application/json");
    header("Acces-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Origin: *");
    header("Acces-Control-Allow-Headers: Acces-Control-Allow-Headers, Content-Type,
        Acces-Control-Allow-Methods, Authorization, X-Requested_With");

    include_once("../Configuration/Database.php");
    include_once("../Models/BlogAdmin.php");

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $admin=new BlogAdmin($database);
    $admin->AdminUsername=$_POST["Username"];
    $admin->AdminPassword=$_POST["Password"];
    $exists=$admin->doesItExist();

    $http_referer = $_SERVER['HTTP_REFERER'];

    if ( ($http_referer !== "http://localhost:3001/" && $http_referer !== "https://andresrodriguez55.github.io/") 
        || ($exists!="1"))
    {  
        echo "Access denegated...";
        exit();
    }

    include_once("../Models/Category.php");
    $categories=new Category($database);
    $categories->NameOfCategory=$_POST["NameOfCategory"];
    $categories->deleteNameOfCategory();
?>