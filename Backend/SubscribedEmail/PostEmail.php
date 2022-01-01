<?php
    header("Content-Type: application/json");
    header("Acces-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Origin: *");
    header("Acces-Control-Allow-Headers: Acces-Control-Allow-Headers, Content-Type,
        Acces-Control-Allow-Methods, Authorization, X-Requested_With");

    $http_referer = $_SERVER['HTTP_REFERER'];

    if ($http_referer != "http://localhost:3001/" && $http_referer != "https://andresrodriguez55.github.io/")
    {  
        echo "Access denegated...\n";
        exit();
    }
    
    include_once("../Configuration/Database.php");
    include_once("../Models/SubscribedEmail.php");

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $newSubscription=new SubscribedEmail($database);

    $newSubscription->Email=$_POST["Email"];
    $newSubscription->IP=$_POST["IP"];
    date_default_timezone_set("Europe/Istanbul");
    $newSubscription->SubscriptionDate=date('Y-m-d H:i:s', time());
    
	$newSubscription->create();
?>