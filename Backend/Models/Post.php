<?php
    class Post
    {
        private $database=null;

        public $ID;
        public $Title;
        public $Content;
        public $PostDate;
        public $Category;

        public function __construct($db)
        {
            $this->database=$db;
        }

        public function doesTheCategoryExists()
        {
            if(!isset($this->Category))
            {
                return "0";
            }

            $query= "SELECT EXISTS(SELECT NameOfCategory FROM CATEGORY WHERE NameOfCategory='" . $this->Category . "')";

            if ($result = mysqli_query($this->database, $query) or die("Query error...")) 
            {
                $row=mysqli_fetch_array($result, MYSQLI_NUM);
                return $row[0];
            }
        }

        public function getPosts()
        {
            $all=array();

            $query=NULL;
            if($this->doesTheCategoryExists()=="1") 
            {
                $query= "SELECT * FROM POST WHERE Category = '" . $this->Category . "' ORDER BY POST.PostDate DESC";
            }

            else
            {
                $query= "SELECT * FROM POST WHERE Category != 'Projects' ORDER BY POST.PostDate DESC  ";
            }

            if ($result = mysqli_query($this->database, $query) or die("Query error...")) 
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
    }
?>