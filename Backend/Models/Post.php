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
                $query= "SELECT * FROM POST WHERE Category != 'Projects' ORDER BY POST.PostDate DESC  ";
            }

            if ($result = mysqli_query($this->database, $query) or die("Posts query error...")) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $row["PostDate"]=date('d.m.Y H:i', strtotime($row["PostDate"]));
                    $all[]=$row;
                }
            }

            echo json_encode($all);
        }

        public function getConcrete()
        {
            $query= "SELECT * FROM POST WHERE POST.ID=" . $this->ID;

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

        public function postOrUpdatePost()
        { 
            $query="INSERT INTO POST (ID, Title, Content, PostDate, Category, CoverPhotoLink) 
                    VALUES($this->ID, \"$this->Title\", \"$this->Content\", 
                        '$this->PostDate', '$this->Category', '$this->CoverPhotoLink')
                        ON DUPLICATE KEY UPDATE Title = \"$this->Title\", Content = \"$this->Content\", 
                        PostDate = '$this->PostDate', Category = '$this->Category', 
                        CoverPhotoLink = '$this->CoverPhotoLink' ";

            mysqli_query($this->database, $query) or die("Post update or post action error...".$this->Content);
        }

        public function deletePost()
        {
            $query="DELETE FROM POST WHERE ID = '$this->ID'";
            
            mysqli_query($this->database, $query) or die("Post delete error...");
        }
    }
?>