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
    include_once("../Models/UserComment.php");

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $comment=new UserComment($database);

    $comment->setID();
    $comment->PostID=$_POST["PostID"];
    $comment->Nick=$_POST["Nick"];
    $comment->Content=$_POST["Content"];
    
    $comment->IP=$_POST["IP"];

    $geoInfo = file_get_contents('http://ip-api.com/json/' . $comment->IP);
    $geoInfo = json_decode($geoInfo);
    $comment->Country = $geoInfo->country;
    
    date_default_timezone_set("Europe/Istanbul");
    $comment->CommentDate=date('Y-m-d H:i:s', time());
    $comment->setSQLTurkeyTimeZone();

    if($comment->canThisUserMakeTodayAComment()=="1")
    {
        $comment->create();    
    }

    else
    {
        echo "You passed the maximum comment quota for today!\nEvery day a maximum of 3 comments can be made for each device!";
    }
?>