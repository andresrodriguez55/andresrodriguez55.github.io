<?php
    //Load Composer's autoloader
    require '../vendor/autoload.php';

    class EmailService
    {
        public function __construct()
        {
        }

        public function sendMail($message, $destination)
        {
            $email = new \SendGrid\Mail\Mail(); 
            $sendgrid = new \SendGrid("");

            $email->setFrom('', '');
            $email->setSubject("New Post of Andres's Blog!");
            $email->addTo($destination, "User");
            $email->addContent("text/plain", "Click to see");
            $email->addContent("text/html", $message);

            $sendgrid->send($email);
        }
    }
?>