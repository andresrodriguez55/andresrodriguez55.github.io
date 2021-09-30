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
        public $TimeZone;
        public $Country;

        public function __construct($db)
        {
            $this->database=$db;
        }

        public function getForConcretePost()
        {
            $all=array();

            $query= "SELECT Nick, Content, CommentDate, TimeZone FROM USER_COMMENT WHERE PostID=" . $this->PostID . " ORDER BY CommentDate ASC";
            
            if ($result = mysqli_query($this->database, $query) or die("Query error...")) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $all[]=(object)array("Nick"=>$row["Nick"], "Content"=>$row["Content"], 
                        "CommentDate"=>$row["CommentDate"], "TimeZone"=>$row["TimeZone"],);
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

        public function canThisUserMakeTodayAComment()
        {
            $query="SELECT (SELECT COUNT(*) FROM USER_COMMENT WHERE IP = '$this->IP') <=2";

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
                '$this->TimeZone' , '$this->Country' )";
            
            mysqli_query($this->database, $query) or die("Insert error...");
        }
    }
?>