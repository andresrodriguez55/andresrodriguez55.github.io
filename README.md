# FULLSTACK BLOG WITH A BASIC COMMENT SYSTEM (REACT, PHP & MYSQL)

[LINK](https://andresrodriguez55.github.io/#/)

In this project I decided once and for all to immerse myself in the world of the backend. I have had experience with react before but never in all the projects in which I have used it have I made a backend.

The first big problem I encountered was choosing the type of database that I would implement here, I really wanted to use a relational database but I knew that doing that would make it very difficult for me to continue the project because I had no idea of what was I going to do with the host issue and partly that I had never had experience with a relational base in a project like this (I do not count one of .net that I have because thanks to blazor and the entity framework they solve many things that I should have learned to do it manually). I saw that mongoDB provided good functionalities and its free version was sufficient for this project but I wanted to implement something really workable already using everything I learned in the database course at university.

![](https://miro.medium.com/max/724/1*a12jcIx2aBvavjGMht777Q.png)

In the end I decided to jump into the pool and once and for all learn to manage to learn faster, in the subject of the uni I only used microsoft sql server (that is transact sql) and this made this adventure bigger, because I looked at the free hosts that circulate around the network normally accepts databases designed with mysql. I was one day thinking about what to use for the backend, on the one hand because I liked java I wanted to use the spring frame, but on the other hand the host issue had me discouraged, so I decided that day to prepare the page with react without thinking about what the rest.

The next day, having something basic in hand, I decided to investigate, I saw that the leading framework for this year was laravel for the backend.

I had already heard many complaints about php and many others say that it was dying, but the truth is that it was striking for me to learn even the basics. I decided to look at the course on the sololearn page because it was always brief in its courses and at the same time to look at o'reilly's books. 2 days later I felt ready, I started to get into the adventure of communication between the frontend and the backend (without using the laravel frame, the purpose was to have a base to be able to learn the frame in the future if necessary).

![](https://bernardoayala.com/img/frontend-vs-backend.webp)

I had many doubts about how the server accepted the client's requests and how it accepted POST actions and I am very happy to have implemented php in this project, it is not that I do an incredible job there but at least I am happy with some solutions that I implement for some cases so I will only explain those solutions.

## Database Design

![](https://drive.google.com/uc?id=1cv7cR4UbBa7yexA6A3t1L1YU6aaOA66I)

As you can see in the diagram, the base is very basic, but sufficient for all the inconveniences that could arise. For the management of the posts that I do it was obvious that I needed the POST and CATEGORY entities, the attributes that they contain that are also seen were also obvious that I needed them so I am not going to go into detail about them, I think the strong point of all this it is everything related to the USER_COMMENT table so I am going to delve into this table.

It is obvious that in this table, looking at it logically, the attributes related to geolocation are highlighted so I will get to the point with them, I decided to require these attributes to somehow **avoid customer spam**.

I looked at free comment services such as disqus but they did not convince me, aesthetically they will look very good but after not making a system I did not make sense to use them, so after thinking I decided to **make a basic system such that every time a client do a POST action, the client's IP will be checked in the database if the client reached a limit of comments chosen by me on that day**.

![](https://drive.google.com/uc?id=1OXwy14lTQdQdsPLJzr2q0T6kYRJj4Tl3)

I also want to emphasize that I thought up to the issue of the dates of the comments, I mean the time difference, so **whenever someone comments on a post I will always save the time zone of that client so that whenever I show a comment to another client can adapt the dates of the comments to the time zone of that client**.

| ![](https://drive.google.com/uc?id=1sw23OpEUm3n1A7jgQ-kwGdQB3r3zzHSN) | ![](https://drive.google.com/uc?id=1jYRuTE5sMaEbENZGQS2mJmRCRxHvfzBT)| 
|:---:|:---:|

## Triggers & Contraints of SQL

I have also decided to talk about my assimilations, also always remembering that since I will be the only one when using this database, I have not given much importance to optimization.

I am going to leave the scripts that I have written, because it is not worth explaining each thing since there is not much to comment, I just want to comment that the only triggers there are are to facilitate the management of the posts, I know they are not very optimal but because I will be the only one to use this base I have decided to put those triggers, I also want to emphasize that the reason for the constraints that the USER_COMMENT table has is because the client's information would be taken from another party and if the The possibility of a corrupted data coming could handle the situation, finally I would like to emphasize that also to avoid having unwanted comments I have decided to choose the minimum characters that should contain the nicknames and the comments of the users.

``` SQL 
CREATE DATABASE BLOG;

USE BLOG;

/* ---TABLES--- */
CREATE TABLE CATEGORY
(
	NameOfCategory VARCHAR(20),
	PRIMARY KEY (NameOfCategory),
	CHECK(LENGTH(NameOfCategory)>=1)
);

CREATE TABLE POST
(
	ID INT,
	Title VARCHAR(255) NOT NULL,
	Content TEXT(16000) NOT NULL, 
	PostDate DATETIME NOT NULL,
	Category VARCHAR(20),
    CoverPhotoLink VARCHAR(2048), /* The maximum length of a URL in the address bar is 2048 characters. */

	PRIMARY KEY (ID),
	FOREIGN KEY (Category) REFERENCES CATEGORY(NameOfCategory) ON DELETE SET NULL ON UPDATE CASCADE,

	CHECK(ID>=0),
	CHECK(LENGTH(Title)>=3),
	CHECK(LENGTH(Content)>=40),
    CHECK(LENGTH(CoverPhotoLink)>=10)
);

CREATE TABLE USER_COMMENT
(
		ID INT,
		PostID INT NOT NULL,
		Nick VARCHAR(30) NOT NULL, 
		Content VARCHAR(280) NOT NULL, /* La longitud maxima de un tweet de twiter es 280! */
		CommentDate DATETIME NOT NULL,
        IP VARCHAR(45) NOT NULL, /* The correct maximum IPv6 string length is 45! */
        TimeZone VARCHAR(30) NOT NULL, /* The Area and Location names have a maximum length of 14 characters! */
        Country VARCHAR(56), /* max: The United Kingdom of Great Britain and Northern Ireland (56) , min: 4*/

		PRIMARY KEY (ID),
		FOREIGN KEY (PostID) REFERENCES POST(ID) ON DELETE CASCADE ON UPDATE CASCADE,

		CHECK(ID>=0),
		CHECK(LENGTH(Nick)>=3),
		CHECK(LENGTH(Content)>=2),
        CHECK (LENGTH(IP)>=7),
        CHECK (LENGTH(TimeZone)>=5),
        CHECK (LENGTH(Country)>=4)
);
/* ------------ */

/* ---TRIGGER--- */
DELIMITER //
CREATE TRIGGER FIX_POST_TUPLES BEFORE INSERT ON POST
FOR EACH ROW BEGIN 
	IF EXISTS(SELECT * FROM POST WHERE POST.Title=NEW.Title) THEN SIGNAL SQLSTATE '45000'; END IF;
	
	SET NEW.ID=(SELECT COUNT(*) FROM POST);

	IF (NEW.CoverPhotoLink IS NULL) 
	THEN SET NEW.CoverPhotoLink='https://images.unsplash.com/photo-1537884944318-390069bb8665?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29kZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80';
	END IF;
	
	IF (NEW.PostDate IS NULL) 
	THEN SET NEW.PostDate=NOW();
	END IF;
	
	IF (NEW.Category IS NULL) 
	THEN SET NEW.Category='Notes';
	ELSE
		SET NEW.Category=CONCAT(UPPER(SUBSTRING(NEW.Category, 1, 1)), LOWER(SUBSTRING(NEW.Category, 2)));
	END IF;
END//

CREATE TRIGGER FIX_CATEGORY_VALUES BEFORE INSERT ON CATEGORY
FOR EACH ROW BEGIN 
        SET NEW.NameOfCategory=CONCAT(UPPER(SUBSTRING(NEW.NameOfCategory, 1, 1)), LOWER(SUBSTRING(NEW.NameOfCategory, 2)));
END//
DELIMITER ;
/* ------------- */
```

## PHP Implementation in The Server Side

The important points of the server are that it only accepts POST requests from the domain of this page, also that the server has been designed using the implementation of the model view controller (MVC) architecture. **To protect the information of the users I never expose out the attributes of their countries and IPs**.

#### Database.php
``` php
<?php
    class Database
    {
        private $database;

        private $serverName='';
        private $userName='';
        private $password='';
        private $nameOfDatabase=''; 

        public function connect()
        {
            $this->database=mysqli_connect($this->serverName, $this->userName, $this->password, $this->nameOfDatabase)
                or die('SQL connection error...');
        }

        public function disconnect()
        {
            mysqli_close($database);
        }

        public function get()
        {
            return $this->database;
        }
    }
?>
```

### Models

#### Post.php
``` php
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

        public function getAllPosts()
        {
            $all=array();

            $query= 'SELECT * FROM POST WHERE Category != 'Projects' ORDER BY POST.PostDate DESC  ';

            if ($result = mysqli_query($this->database, $query) or die('Query error...')) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $row['PostDate']=date('d.m.Y H:i', strtotime($row['PostDate']));
                    $all[]=$row;
                }
            }

            echo json_encode($all);
        }

        public function getAllProjects()
        {
            $all=array();

            $query= 'SELECT * FROM POST WHERE Category = 'Projects' ORDER BY POST.PostDate DESC  ';

            if ($result = mysqli_query($this->database, $query) or die('Query error...')) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $row['PostDate']=date('d.m.Y H:i', strtotime($row['PostDate']));
                    $all[]=$row;
                }
            }

            echo json_encode($all);
        }

        public function getConcrete()
        {
            $query= 'SELECT * FROM POST WHERE POST.ID=' . $this->ID;

            if ($result = mysqli_query($this->database, $query) or die('Query error...')) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $this->Title=$row['Title']; 
                    $this->Content=$row['Content'];
                    $this->PostDate=$row['PostDate'];
                    $this->Category=$row['Category'];

                    echo json_encode($row);
                }
            }
        }
    }
?>
``` 

#### UserComment.php
``` php
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

            $query= 'SELECT Nick, Content, CommentDate, TimeZone FROM USER_COMMENT WHERE PostID=' . $this->PostID . ' ORDER BY CommentDate ASC';
            
            if ($result = mysqli_query($this->database, $query) or die('Query error...')) 
            {
                while($row=mysqli_fetch_array($result, MYSQLI_ASSOC))
                {
                    $all[]=(object)array('Nick'=>$row['Nick'], 'Content'=>$row['Content'], 
                        'CommentDate'=>$row['CommentDate'], 'TimeZone'=>$row['TimeZone'],);
                }
            }

            echo json_encode($all);
        }

        public function setID()
        {
            $query='SELECT ID FROM USER_COMMENT ORDER BY ID DESC LIMIT 1';

            if ($result = mysqli_query($this->database, $query) or die('Query error...')) 
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
            $query='SELECT (SELECT COUNT(*) FROM USER_COMMENT WHERE IP = '$this->IP') <=2';

            if ($result = mysqli_query($this->database, $query) or die('User comment count query error...')) 
            {
                $row=mysqli_fetch_array($result, MYSQLI_NUM);
                return $row[0];
            }
        }

        public function create()
        {
            $query='INSERT INTO USER_COMMENT VALUES($this->ID , $this->PostID ,  
                '$this->Nick' ,  '$this->Content' , '$this->CommentDate' , '$this->IP' ,
                '$this->TimeZone' , '$this->Country' )';
            
            mysqli_query($this->database, $query) or die('Insert error...');
        }
    }
?>
``` 

### Post Funcions Requests

#### ReadAll.php
``` php
<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once('../Configuration/Database.php');
    include_once('../Models/Post.php');

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $posts=new Post($database);
    $posts->getAllPosts();

    $database->disconnect();
?>
```

#### ReadConcrete.php
``` php
<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once('../Configuration/Database.php');
    include_once('../Models/Post.php');

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $post=new Post($database);

    $post->ID=isset($_GET['ID']) ? $_GET['ID'] : die();

    $post->getConcrete();

    $database->disconnect();
?>
```

#### Project/ReadAll.php
``` php
<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once('../Configuration/Database.php');
    include_once('../Models/Post.php');

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $posts=new Post($database);
    $posts->getAllProjects();

    $database->disconnect();
?>
```

### UserComment Funcions Requests

#### Create.php
``` php
<?php
    $http_referer = $_SERVER['HTTP_REFERER'];

    if ($http_referer != 'http://localhost:3001' && $http_referer == 'https://andresrodriguez55.github.io')
    {  
        echo 'Access denegated...';
        exit();
    }
    
    header('Content-Type: application/json');
    header('Acces-Control-Allow-Methods: POST');
    header('Acces-Control-Allow-Headers: Acces-Control-Allow-Headers, Content-Type,
        Acces-Control-Allow-Methods, Authorization, X-Requested_With');

    include_once('../Configuration/Database.php');
    include_once('../Models/UserComment.php');

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $comment=new UserComment($database);

    $comment->setID();
    $comment->PostID=$_POST['PostID'];
    $comment->Nick=$_POST['Nick'];
    $comment->Content=$_POST['Content'];
    
    $comment->IP=$_POST['IP'];

    $geoInfo = file_get_contents('http://ip-api.com/json/' . $comment->IP);
    $geoInfo = json_decode($geoInfo);

    $comment->TimeZone = $geoInfo->timezone;
    $comment->Country = $geoInfo->country;
    
    date_default_timezone_set($comment->TimeZone);
    $comment->CommentDate=date('Y-m-d H:i:s', time());

    if($comment->canThisUserMakeTodayAComment()=='1')
    {
        $comment->create();
        header('Location: ' . $_POST['ClientURL'] );     
    }

    else
    {
        echo 'You passed the maximum comment quota for today!\nEvery day a maximum of 3 comments can be made for each device!';
    }

    $database->disconnect();
?>
```

#### ReadForConcretePost.php
``` php
<?php

    $http_origin = $_SERVER['HTTP_ORIGIN'];

    if ($http_origin == 'http://localhost:3001' || $http_origin == 'https://andresrodriguez55.github.io')
    {  
        header('Access-Control-Allow-Origin: $http_origin');
    }

    header('Content-Type: application/json');

    include_once('../Configuration/Database.php');
    include_once('../Models/UserComment.php');

    $database=new Database();
    $database->connect();
    $database=$database->get();

    $comments=new UserComment($database);

    $comments->PostID=isset($_GET['PostID']) ? $_GET['PostID'] : die();

    $comments->getForConcretePost();

    $database->disconnect();
?>
```

## React Implementation in The Client Side

For the content reading issue, I have used the [react-markdown](https://github.com/remarkjs/react-markdown), [remark-gfm](https://github.com/remarkjs/remark-gfm) and [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) libraries, because it facilitates both the editing and the display of the content, I name these libraries because the truth It has fascinated me that thanks to them, great things can be done in a short time.

On the client side, I would only like to highlight one thing, I have even thought about the issue of a wrong url, as I have shown before in the server part to show a post, the only thing that is necessary is to give its ID, but what if would there be a wrong title in the url? For this reason on the client side I control if the title also matches the content of the database, based on that the content is loaded or if the user is not told that the post he is requesting does not exist.



## Host

The host is completely free, the database is on [clever-cloud](https://www.clever-cloud.com/en/), the php scripts are on [heroku](https://www.heroku.com/) and the static page on the github pages.

![](https://drive.google.com/uc?id=1GSM58-YgNk8tEZuoWaxuiV0Vr0gTbjcR)
