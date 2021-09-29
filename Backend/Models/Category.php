<?php
    class Category
    {
        private $database=null;

        public $NameOfCategory;

        public function __construct($db)
        {
            $this->database=$db;
        }

        public function getCategoriesOfPosts()
        {
            $all=array();

            $query= "SELECT * FROM CATEGORY WHERE NameOfCategory != 'Projects' ORDER BY NameOfCategory DESC";

            if ($result = mysqli_query($this->database, $query) or die("Category query error...")) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $all[]=$row;
                }
            }

            echo json_encode($all);
        }
    }
?>