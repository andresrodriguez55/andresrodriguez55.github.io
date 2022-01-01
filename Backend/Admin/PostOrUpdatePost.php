<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    //Load Composer's autoloader
    require '../vendor/autoload.php';

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

    include_once("../Models/Post.php");
    
    $post=new Post($database);

    $post->ID=$_POST["ID"];
    $post->Title=$_POST["Title"];
    $post->Content=$_POST["Content"];
    $post->PostDate=$_POST["PostDate"];
    $post->Category=$_POST["Category"];
    $post->CoverPhotoLink=$_POST["CoverPhotoLink"];

    $isNewPostPosted = $post->postOrUpdatePost();

    if($isNewPostPosted==1)
    {
        include_once("../Models/SubscribedEmail.php");
        $emails=new SubscribedEmail($database);

        include_once("../Configuration/EmailService.php");
        $emailService=new EmailService();

        $emails->notifyAllUsersForNewPost($emailService, $post->Title, 
            $post->ID, $post->CoverPhotoLink, $post->Category, $post->PostDate);  
    }
    
?>