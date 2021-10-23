<?php
    class Database
    {
        private $database;

        private $serverName="";
        private $userName="";
        private $password="";
        private $nameOfDatabase=""; 

        public function connect()
        {
            $this->database=mysqli_connect($this->serverName, $this->userName, $this->password, $this->nameOfDatabase)
                or die("SQL connection error...");
        }

        public function disconnect()
        {
            mysqli_close($this->database);
        }

        public function get()
        {
            return $this->database;
        }
    }
?>