<?php
    class BlogAdmin
    {
        private $database=null;

        public $AdminUsername;
        public $AdminPassword;

        public function __construct($db)
        {
            $this->database=$db;
        }

        public function doesItExist()
        {
            $query= "SELECT EXISTS ( SELECT * FROM BLOG_ADMIN WHERE AdminUsername = '$this->AdminUsername' AND AdminPassword = '$this->AdminPassword' ) ";

            if ($result = mysqli_query($this->database, $query) or die("Admin query error...")) 
            {
                $row=mysqli_fetch_array($result, MYSQLI_NUM);
                return $row[0];
            }
        }
    }
?>