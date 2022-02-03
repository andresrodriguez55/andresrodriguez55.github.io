<?php
    header("Content-Type: application/json");
    header("Acces-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Origin: *");
    header("Acces-Control-Allow-Headers: Acces-Control-Allow-Headers, Content-Type,
        Acces-Control-Allow-Methods, Authorization, X-Requested_With");

    include_once("../Configuration/Database.php");
    include_once("../Models/SubscribedEmail.php");

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $subscription=new SubscribedEmail($database);
	
    $subscription->Email=isset($_GET["Email"]) ? $_GET["Email"] : die();
	$subscription->deleteSubscriptionWithThatEmail();
?>