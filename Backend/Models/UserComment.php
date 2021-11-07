<?php
    class UserComment
    {
        private $database=null;

        public $ID;
        public $PostID;
        public $Nick;
        public $Content;
        public $CommentDate;
        public $IP;
        public $Country;

        public function __construct($db)
        {
            $this->database=$db;
        }

        public function getForConcretePost()
        {
            $all=array();

            $query= "SELECT Nick, Content, CommentDate FROM USER_COMMENT WHERE PostID=" . $this->PostID . " ORDER BY CommentDate ASC";
            
            if ($result = mysqli_query($this->database, $query) or die("Query error...")) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $all[]=(object)array("Nick"=>$row["Nick"], "Content"=>$row["Content"], 
                        "CommentDate"=>$row["CommentDate"]);
                }
            }

            echo json_encode($all);
        }

        public function setID()
        {
            $query="SELECT ID FROM USER_COMMENT ORDER BY ID DESC LIMIT 1";

            if ($result = mysqli_query($this->database, $query) or die("Query error...")) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_NUM))
                {
                    $this->ID=($row[0]+1);
                }

                if (!isset($this->ID))
                {
                    $this->ID=0;
                }
            }
        }

        public function setSQLTurkeyTimeZone()
        {
            $query="SET time_zone = '+03:00' ;";
            mysqli_query($this->database, $query) or die("Time zone error...");
        }

        public function canThisUserMakeTodayAComment()
        {
            $query="SELECT (SELECT COUNT(*) FROM USER_COMMENT WHERE IP = '$this->IP' AND CAST(CommentDate AS DATE) = DATE(NOW())  ) <=2";

            if ($result = mysqli_query($this->database, $query) or die("User comment count query error...")) 
            {
                $row=mysqli_fetch_array($result, MYSQLI_NUM);
                return $row[0];
            }
        }

        public function create()
        {
            $query="INSERT INTO USER_COMMENT VALUES($this->ID , $this->PostID ,  
                '$this->Nick' ,  '$this->Content' , '$this->CommentDate' , '$this->IP' ,
                '$this->Country' )";
            
            mysqli_query($this->database, $query) or die("Comment insert error...");
        }

        public function getCountsByMonths()
        {
            $query="SELECT MONTH(CAST(CommentDate AS DATE)) AS CommentsMonth, YEAR(CAST(CommentDate AS DATE)) AS 
                CommentsYear, COUNT(*) AS CommentsCount FROM USER_COMMENT 
                GROUP BY CommentsMonth, CommentsYear ORDER BY CommentsMonth, CommentsYear";

            if ($result = mysqli_query($this->database, $query) or die("Query error...")) 
            {
                while($row=mysqli_fetch_array($result))
                {
                    $all[]=(object)array("CommentsMonth"=>$row["CommentsMonth"], 
                        "CommentsYear"=>$row["CommentsYear"], "CommentsCount"=>$row["CommentsCount"]);
                }
            }

            echo json_encode($all);
        }

        public function getCountsByCountries()
        {
            $query="SELECT Country, COUNT(*) AS CommentsCount FROM USER_COMMENT 
                GROUP BY Country ORDER BY Country ASC";

            if ($result = mysqli_query($this->database, $query) or die("Query error...")) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $all[]=(object)array("Country"=>$row["Country"], "CommentsCount"=>$row["CommentsCount"]);
                }
            }

            echo json_encode($all);
        }

        public function getInfoForAdmin()
        {
            $all=array();

            $query= "SELECT USER_COMMENT.ID AS id, POST.Title AS PostTitle, USER_COMMENT.Nick AS UserCommentNick, USER_COMMENT.Content AS UserCommentContent, USER_COMMENT.Country AS UserCountry, USER_COMMENT.CommentDate FROM USER_COMMENT, POST WHERE USER_COMMENT.PostID=POST.ID ORDER BY USER_COMMENT.CommentDate DESC";

            if ($result = mysqli_query($this->database, $query) or die("Category query error...")) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $all[]=$row;
                }
            }

            echo json_encode($all);
        }

        public function deleteCommentWithThatID()
        {
            $query="DELETE FROM USER_COMMENT WHERE ID = $this->ID";
            
            mysqli_query($this->database, $query) or die("Comment delete error...");
        }

        public function updateCommentNickAndContent()
        {
            $query="UPDATE USER_COMMENT SET Nick = '$this->Nick', Content = '$this->Content' WHERE ID = $this->ID ";
            
            mysqli_query($this->database, $query) or die("Comment update error...".$this->Content);
        }
    }
?>