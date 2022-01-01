<?php
    class Post
    {
        private $database=null;

        public $ID;
        public $Title;
        public $Content;
        public $PostDate;
        public $Category;
        public $CoverPhotoLink;

        public function __construct($db)
        {
            $this->database=$db;
        }

        public function getPosts()
        {
            $all=array();

            $query=NULL;
            if(isset($this->Category)) 
            {
                $query= "SELECT * FROM POST WHERE Category = '" . $this->Category . "' ORDER BY POST.PostDate DESC";
            }

            else
            {
                $query= "SELECT * FROM POST WHERE Category != 'Projects' AND Category != 'Private' ORDER BY POST.PostDate DESC  ";
            }

            if ($result = mysqli_query($this->database, $query) or die("Posts query error...")) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $all[]=$row;
                }
            }

            echo json_encode($all);
        }

        public function getConcrete()
        {
            $query= "SELECT * FROM POST WHERE POST.Category!='Private' AND POST.ID=" . $this->ID;

            if ($result = mysqli_query($this->database, $query) or die("Query error...")) 
            {
                $row=mysqli_fetch_array($result, MYSQLI_ASSOC);

                $this->Title=$row["Title"]; 
                $this->Content=$row["Content"];
                $this->PostDate=$row["PostDate"];
                $this->Category=$row["Category"];

                echo json_encode($row);
            }
        }

        public function getInfoForAdmin()
        {
            $all=array();

            $query= "SELECT POST.ID AS id, POST.Content AS PostContent, POST.Category AS PostCategory, POST.CoverPhotoLink AS PostCoverPhotoLink, POST.Title AS PostTitle, POST.PostDate, COUNT(USER_COMMENT.PostID) AS NumberOfComments FROM POST LEFT OUTER JOIN USER_COMMENT ON USER_COMMENT.PostID=POST.ID GROUP BY POST.ID ORDER BY POST.PostDate DESC";

            if ($result = mysqli_query($this->database, $query) or die("Category query error...")) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $all[]=$row;
                }
            }

            echo json_encode($all);
        }

        private function notifyAllUsersForNewPost()
        {
            include_once("./SubscribedEmail.php");
            $emails=new SubscribedEmail($this->database);

            include_once("../Configuration/EmailService.php");
            $emailService=new EmailService();

            $emails->notifyAllUsersForNewPost($emailService, $this->Title, 
                $this->ID, $this->CoverPhotoLink, $this->Category, $this->PostDate);  
        }

        public function postOrUpdatePost()
        {
            if (!is_numeric($this->ID)) //New post
            {
                $query="INSERT INTO POST (Title, Content, PostDate, Category, CoverPhotoLink) 
                    VALUES( \"$this->Title\", \"$this->Content\", 
                    '$this->PostDate', '$this->Category', '$this->CoverPhotoLink')";

                mysqli_query($this->database, $query) or die("Post action error... ");
                
                $query = "SELECT ID FROM POST ORDER BY ID DESC LIMIT 1";
                if ($result = mysqli_query($this->database, $query) or die("Error for getting new posted post id...")) 
                {
                    $row=mysqli_fetch_array($result, MYSQLI_ASSOC);
                    $this->ID = $row["ID"];
                    $this->notifyAllUsersForNewPost();
                }
            }

            else //Update
            {
                $query="UPDATE POST SET Title = \"$this->Title\", Content = \"$this->Content\", 
                            PostDate = '$this->PostDate', Category = '$this->Category', 
                            CoverPhotoLink = '$this->CoverPhotoLink' WHERE POST.ID = $this->ID";

                mysqli_query($this->database, $query) or die("Post update error...");
            }
        }

        public function deletePost()
        {
            $query="DELETE FROM POST WHERE ID = '$this->ID'";
            
            mysqli_query($this->database, $query) or die("Post delete error...");
        }
    }
?>