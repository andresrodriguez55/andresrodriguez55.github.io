<?php
    $http_referer = $_SERVER['HTTP_REFERER'];

    if ($http_referer != "http://localhost:3001" && $http_referer == "https://andresrodriguez55.github.io")
    {  
        echo "Access denegated...";
        exit();
    }
    
    header("Content-Type: application/json");
    header("Acces-Control-Allow-Methods: POST");
    header("Acces-Control-Allow-Headers: Acces-Control-Allow-Headers, Content-Type,
        Acces-Control-Allow-Methods, Authorization, X-Requested_With");

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

    $comment->TimeZone = $geoInfo->timezone;
    $comment->Country = $geoInfo->country;
    
    date_default_timezone_set($comment->TimeZone);
    $comment->CommentDate=date('Y-m-d H:i:s', time());

    if($comment->canThisUserMakeTodayAComment()=="1")
    {
        $comment->create();
        header('Location: ' . $_POST["ClientURL"] );     
    }

    else
    {
        echo "You passed the maximum comment quota for today!\nEvery day a maximum of 3 comments can be made for each device!";
    }

    $database->disconnect();
?>