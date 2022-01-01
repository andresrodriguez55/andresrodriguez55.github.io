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

            $query= "SELECT NameOfCategory FROM CATEGORY WHERE NameOfCategory != 'Projects' AND NameOfCategory != 'Private' ORDER BY NameOfCategory DESC";

            if ($result = mysqli_query($this->database, $query) or die("Category query error...")) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $all[]=$row;
                }
            }

            echo json_encode($all);
        }

        public function getInfoForAdmin()
        {
            $all=array();

            $query= "SELECT NameOfCategory AS id, NameOfCategory, COUNT(POST.Category) AS NumberOfPosts FROM CATEGORY LEFT OUTER JOIN POST ON POST.Category=NameOfCategory GROUP BY NameOfCategory";

            if ($result = mysqli_query($this->database, $query) or die("Category query error...")) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $all[]=$row;
                }
            }

            echo json_encode($all);
        }

        public function updateNameOfCategory($newNameOfCategory)
        {
            $query="UPDATE CATEGORY SET NameOfCategory = '$newNameOfCategory' WHERE NameOfCategory = '$this->NameOfCategory' ";
            
            mysqli_query($this->database, $query) or die("Category update error...".$newNameOfCategory);
        }

        public function deleteNameOfCategory()
        {
            $query="DELETE FROM CATEGORY WHERE NameOfCategory = '$this->NameOfCategory'";
            
            mysqli_query($this->database, $query) or die("Category delete error...");
        }

        public function postNameOfCategory()
        {
            $query="INSERT INTO CATEGORY VALUES('$this->NameOfCategory')";
            
            mysqli_query($this->database, $query) or die("Category insertion error...");
        }
    }
?>