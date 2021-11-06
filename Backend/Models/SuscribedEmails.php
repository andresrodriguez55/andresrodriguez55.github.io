<?php

    class SuscribedEmails
    {
        private $database=null;

        public $Email;
        public $IP;
        public $SuscriptionDate;

        public function __construct($db)
        {
            $this->database=$db;
        }

        public function setSQLTurkeyTimeZone()
        {
            $query="SET time_zone = '+03:00' ;";
            mysqli_query($this->database, $query) or die("Time zone error...");
        }

        public function canThisUserMakeTodayASuscription()
        {
            $query="SELECT (SELECT COUNT(*) FROM SUSCRIBED_EMAILS WHERE IP = '$this->IP' AND CAST(SuscriptionDate AS DATE) = DATE(NOW())  ) <=1";

            if ($result = mysqli_query($this->database, $query) or die("User suscription count query error...")) 
            {
                $row=mysqli_fetch_array($result, MYSQLI_NUM);
                return $row[0];
            }
        }
		
		public function isValidEmail()
        {
            return (filter_var($this->Email, FILTER_VALIDATE_EMAIL)) ? "1" : "0";
        }

        public function create()
        {
			if($this->isValidEmail()=="0")
			{
				echo "Invalid e-mail...\n";    
			}
		
			else
			{
				if($this->canThisUserMakeTodayASuscription()=="1")
				{
					$this->setSQLTurkeyTimeZone();
				
					$query="INSERT INTO SUSCRIBED_EMAILS VALUES('$this->Email', '$this->IP', '$this->SuscriptionDate')";
					mysqli_query($this->database, $query) or die("Suscription insert error...");
					
					echo "Subscription made! You will be notified of new posts to the e-mail you entered!";
				}
				
				else
				{
					echo "You passed the maximum suscriptions quota for today!\nEvery day a maximum of 2 suscriptions can be made for each device!";
				}	
			}
        }

        public function deleteSuscriptionWithThatEmail()
        {
            $query="DELETE FROM SUSCRIBED_EMAILS WHERE Email = '$this->Email'";
            
            mysqli_query($this->database, $query) or die("Suscription delete error...");
			
			echo "Unsuscribed done for the email: ".$this->Email;
        }
		
		public function getAllUsersEmailsAsArray()
		{
			$usersEmailArray=array();
			
			$query="SELECT Email FROM SUSCRIBED_EMAILS";
			
			if ($result = mysqli_query($this->database, $query) or die("Emails query error...")) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $usersEmailArray[]=$row["Email"];
                }
            }

			return $usersEmailArray;
		}
		
		public function notifyAllUsersForNewPost($emailService, $newPostTitle, $newPostID)
        {
          
			$newPostLink="https://andresrodriguez55.github.io/#/post/" . $newPostID . "/" . str_replace(" ","%20", $newPostTitle);
			$subject = "New Post of Andres's Blog!";
			
			$usersEmailArray=$this->getAllUsersEmailsAsArray();

			foreach($usersEmailArray as $userEmail)
			{
                $message = "
                <html>
                <head>
                <title>New Post of Andres's Blog!</title>
                </head>
                <body>
                <h2>New Post Title: ". $newPostTitle ."</h2>
                <br>
                <a href='". $newPostLink ."'>Post link.</a>
                <br>
                <a href='https://".$_SERVER['HTTP_HOST']."/SuscribedEmails/DeleteEmail.php?Email=".$userEmail."'>Unsuscribe</a>
                </body>
                </html>
                ";

                $emailService->sendMail($message, $userEmail);
			}
        }
    }
?>