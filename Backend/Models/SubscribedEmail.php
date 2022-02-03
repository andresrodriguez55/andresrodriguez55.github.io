<?php

    class SubscribedEmail
    {
        private $database=null;

        public $Email;
        public $IP;
        public $SubscriptionDate;

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
            $query="SELECT (SELECT COUNT(*) FROM SUBSCRIBED_EMAIL WHERE IP = '$this->IP' AND CAST(SubscriptionDate AS DATE) = DATE(NOW())  ) <=1";

            if ($result = mysqli_query($this->database, $query) or die("User subscription count query error...")) 
            {
                $row=mysqli_fetch_array($result, MYSQLI_NUM);
                return (int)$row[0];
            }
        }
		
		public function isValidEmail()
        {
            return (filter_var($this->Email, FILTER_VALIDATE_EMAIL)) ? 1 : 0;
        }

        public function create()
        {
			if($this->isValidEmail()==0)
			{
				echo "Invalid e-mail...\n";    
			}
		
			else
			{
				if($this->canThisUserMakeTodayASuscription()==1)
				{
					$this->setSQLTurkeyTimeZone();
				
					$query="INSERT INTO SUBSCRIBED_EMAIL VALUES('$this->Email', '$this->IP', '$this->SubscriptionDate')";
					$result=mysqli_query($this->database, $query);
                    if(!$result)
                    {
                        echo "Subscription insert error... " . mysqli_error($this->database);
                        die();
                    }
					
					echo "Subscription made! You will be notified of new posts to the e-mail you entered!";
				}
				
				else
				{
					echo "You passed the maximum subscriptions quota for today!\nEvery day a maximum of 2 suscriptions can be made for each device!";
				}	
			}
        }

        public function deleteSubscriptionWithThatEmail()
        {
            $query="DELETE FROM SUBSCRIBED_EMAIL WHERE Email = '$this->Email'";
            
            mysqli_query($this->database, $query) or die("Subscription delete error...");
			
			echo "Email ". $this->Email ." has been successfully unsubscribed!";
        }
		
		public function getAllUsersEmailsAsArray()
		{
			$usersEmailArray=array();
			
			$query="SELECT Email FROM SUBSCRIBED_EMAIL";
			
			if ($result = mysqli_query($this->database, $query) or die("Emails query error...")) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $usersEmailArray[]=$row["Email"];
                }
            }

			return $usersEmailArray;
		}

		
		public function notifyAllUsersForNewPost($emailService, $newPostTitle, $newPostID, 
            $newPostImageURL, $newPostCategory, $newPostDate)
        {
			$newPostLink="https://andresrodriguez55.github.io/#/post/" . $newPostID . "/" . str_replace(" ","%20", $newPostTitle);

            $subject = "New Post of Andres's Blog!". $newPostTitle;
			
			$usersEmailArray=$this->getAllUsersEmailsAsArray();

			foreach($usersEmailArray as $userEmail)
			{
                $message = "
                <html>
                    <head>
                        <style>
                            .postGrid
                            {
                                background-color: rgba(230, 230, 230, 0.308);
                                position: relative;
                                -webkit-transition: all 400ms;
                            }

                            .postGridImage
                            {
                                display: block;
                                margin-left:auto;
                                margin-right:auto;
                                width: 50%;
                                filter: brightness(70%);
                            }

                            .postGridInformation
                            {
                                background-color: #000000;
                                color: white;
                                text-shadow: 2px 2px 2px #000000;
                                position: absolute;
                                bottom: 15%;
                                padding-left: 2%;
                                padding-right: 2%;
                                padding-top: 10px;
                                padding-bottom: 10px;
                                width: 48%;
                            }

                            .postGridTitle
                            {
                                font-size: 135%;
                                margin: 0;
                            }

                            .postGridDate
                            {
                                font-size: 82%;
                            }

                            .postGridCategory
                            {
                                font-size: 90%;
                            }
                        </style>
                    </head>
                    <body>
                        <div class='postGrid'> 
                            <img class='postGridImage' src='".$newPostImageURL."' />
                            <center>
                                <div class='postGridInformation'>
                                    <h2 class='postGridTitle'>".$newPostTitle."</h2>
                                    <p class='postGridCategory'>Category: ".$newPostCategory."</p>
                                    <p class='postGridDate'>".$newPostDate."</p>
                                </div>  
                            </center>
                        </div>
                        <a href='". $newPostLink ."'>Post link.</a>
                        <br>
                        <a href='https://".$_SERVER['HTTP_HOST']."/SubscribedEmail/DeleteEmail.php?Email=".$userEmail."'>
                            Unsubscribe
                        </a>          
                    </body>
                </html>
                ";

                $emailService->sendMail($message, $userEmail);
			}
        }
    }
?>