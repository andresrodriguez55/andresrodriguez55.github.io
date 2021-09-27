INSERT INTO CATEGORY VALUES('Notes');
INSERT INTO CATEGORY VALUES('MUSiC');
INSERT INTO CATEGORY VALUES('EXPERIENCES');
INSERT INTO CATEGORY VALUES('PERSONAL');
INSERT INTO CATEGORY VALUES('Projects');

INSERT INTO POST VALUES(0, "My solutions from chapter one of the book 'Cracking the Coding Interview'", 
"
While looking for a good way to end the summer, while researching how to do this blog, I also took a look at some of the books that I had heard before.
I had always heard how many praised the book 'Cracking the Coding Interview', being curious to know its content and decided to acquire a copy.

![](https://images-na.ssl-images-amazon.com/images/I/41oYsXjLvZL._SX348_BO1,204,203,200_.jpg)

Seeing that the book is an exercise book encouraged me to solve the questions on the condition that I always ask the questions on my own and always after comparing the solution provided in the book.
I have decided to upload my solutions to the blog, and I am not going to lie, doing this is a pleasure because it was one of the greatest motivations for making this blog, being able to share what I see, do, research and think.

</br>


## 1.1 Is Unique
``` java
public class Main
{
    static Boolean isUnique(String word) //only lowercase
    {
        int[] letterAppearanceCount = new int[26];
        int endLoop=word.length();
        
        for(int index=0; index<endLoop; index++)
            if((letterAppearanceCount[(int)word.charAt(index)-97]++)!=0)
                return false;
        
        return true;
    }
    
	public static void main(String[] args) 
	{
		String word=\"haola\";
		System.out.println(isUnique(word));
	}
}
```
</br>

## 1.2 Check Permutation
``` java
public class Main
{
    static void mergeSortForCharArray(char[] arr, int initialIndex, int length)
    {
        if(length<2)
            return;
        
        int half=length/2;
        mergeSortForCharArray(arr, initialIndex, half);
        mergeSortForCharArray(arr, (initialIndex+half), (length-half));
        
        int index=0;
        int left=0;
        int right=half;
        char[] sortedArr=new char[length];
        
        while(left<half || right<length)
        {
            if(right==length || (left<half && arr[left+initialIndex]<arr[right+initialIndex]))
                sortedArr[index++]=arr[initialIndex+left++];
                
            else
                sortedArr[index++]=arr[initialIndex+right++];
        }
        
        length+=initialIndex;
        for(int x=initialIndex; x<length; x++)
            arr[x]=sortedArr[x-initialIndex];
    }
    
    static boolean isPermutationOfTheOther(String firstWord, String secondWord)
    {
        int endLoop=firstWord.length();
        if(endLoop!=secondWord.length())
            return false;
        
        char[] firstWordCharArray=firstWord.toCharArray();
        char[] secondWordCharArray=secondWord.toCharArray();
        
        mergeSortForCharArray(firstWordCharArray, 0, endLoop);
        mergeSortForCharArray(secondWordCharArray, 0, endLoop);

        for(int x=0; x<endLoop; x++)
            if(firstWordCharArray[x]!=secondWordCharArray[x])
                return false;
            
        return true;
    }
    
	public static void main(String[] args) 
	{
		String firstWord=\"abcdxqzxy\";
		String secondWord=\"zadxbqcxy\";
		
		System.out.println(isPermutationOfTheOther(firstWord, secondWord));
	}
}

```
</br>

## 1.3 URLify
``` java
public class Main
{
    static char[] URLify(String token, int realLength)
    {
        char[] result=new char[token.length()];
        
        for(int x=0, additionalIndex=0; x<realLength; x++)
        {
            char character=token.charAt(x);
            
            if(character!=' ')
                result[x+additionalIndex]=character;
            else
            {
                result[additionalIndex+x]='%';
                result[++additionalIndex+x]='2';
                result[++additionalIndex+x]='0';
            }
        }
        
        return result;
    }
    
	public static void main(String[] args) 
	{
		String token=\"hola  mun do             \"; //\" \"->\"%20\"
		int realLength=13;
		
		System.out.println(URLify(token, realLength));
	}
}
```
</br>

## 1.4 Palindrome Permutation
``` java
public class Main
{
    static Boolean palindromePermutation(String token) //for lowercase letters
    {
        int checker=0;
        int lengthOfToken=token.length();
        int numberOfSpaces=0;
        
        for(int x=0; x<lengthOfToken; x++)
        {
            char character=token.charAt(x);
            if(character==' ')
            {
                numberOfSpaces++;
                continue;
            }
                
            int position=(character-97);
            checker=checker^(1<<(character-97));
        }
        
        lengthOfToken-=numberOfSpaces;
        
        if((lengthOfToken%2==0 && checker!=0) || (lengthOfToken%2!=0 && (checker&(checker-1))!=0))
            return false;
        return true;
    }
    
	public static void main(String[] args) 
	{
		System.out.println(palindromePermutation(\"tact coa\"));
	}
}
```
</br>

## 1.5 One Away
``` java
public class Main
{
    static Boolean oneAway(String token, String editedToken)
    {
        int lengthToken=token.length();
        int lengthEditedToken=editedToken.length();
        
        if(Math.abs(lengthToken-lengthEditedToken)>1)
            return false;
            
        int minLength=(lengthToken<lengthEditedToken)?lengthToken:lengthEditedToken;
        int checker=0;

        for(int x=0, y=0; x<minLength-1 && y<minLength-1; x++, y++)
        {
            if(token.charAt(x)!=editedToken.charAt(y))
            {
                if(checker!=0)
                    return false;
                checker^=1;
                
                if(token.charAt(x+1)!=editedToken.charAt(y+1))
                {
                    if(token.charAt(x)==editedToken.charAt(y+1))
                        y++;
                    else
                        x++;
                }
            }
        }
        
        if((lengthToken==lengthEditedToken && checker==1) || checker==1)
            return true;
        return false;
    }
    
	public static void main(String[] args) 
	{
		System.out.println(oneAway( \"abcdefg\", \"abcdxfg\"));
	}
}
```
</br>

## 1.6 String Compression
``` java
public class Main
{
    static class Node
    {
        public String value='';
        public Node next;
        
        public void setValue(String value)
        {
            value=this.value;
        }
    }
    
    
    public static String stringCompression(String token)
    {
         Node head=new Node();
         Node traveler=head;
         
         int numberOfCharacters=0;
         int adjacentLetterCount=1;
         
         int endLoop=token.length()-1;
         for(int x=0; x<endLoop; x++)
         {
            if(token.charAt(x)!=token.charAt(x+1))
            {
                traveler.value=String.valueOf(token.charAt(x))+String.valueOf(adjacentLetterCount);
                traveler.next=new Node();
                traveler=traveler.next;
                
                adjacentLetterCount=1;
                numberOfCharacters+=2;
            }
            
            else
                adjacentLetterCount++;
         }
         
         numberOfCharacters+=2;
         if(numberOfCharacters<endLoop+1)
            return token;
         
         if(adjacentLetterCount==1)
             traveler.value=String.valueOf(token.charAt(endLoop))+\"1\";
         else
             traveler.value=String.valueOf(token.charAt(endLoop))+String.valueOf(adjacentLetterCount);

        int x=0;
         char[] arr=new char[numberOfCharacters]; 
         while (head!=null)
         {
             arr[x++]=head.value.charAt(0);
            arr[x++]=head.value.charAt(1);
             head=head.next;
         }
         
         return new String(arr);
    }
    
	public static void main(String[] args) 
	{
		System.out.println(stringCompression( \"aaaabbcddefffggg\"));
	}
}
```

</br>

## 1.7 Rotate Matrix
``` java
public class Main
{
    static int[][] rotateMatrix(int[][] arr) //only for NxN
    {
        int n=arr.length;
        int[][] result=new int[n][n];
        
        int endLoop=n*n;
        for(int x=0; x<endLoop; x++)
            result[x%n][n-x/n-1]=arr[x/n][x%n];
            
        return result;
    }
    
	public static void main(String[] args) 
	{
	    
	    int[][] arr={{1, 2, 66, 3}, {4, 4, 6, 2}, {1, 78, 1, 9}, {0, 1, 2, 3}};
	    arr=rotateMatrix(arr);
	    
		int endLoop=arr.length;
		for(int x=0; x<endLoop; x++)
		{
		    for(int y=0; y<endLoop; y++)
		        System.out.printf(\"%d \", arr[x][y]);
	        System.out.printf(\"\n\");
		}
	}
}
```
</br>

## 1.8 Zero Matrix
``` java
public class Main
{
    static Boolean mustSkip(int checker, int index)
    {
        if((checker>>index)%2==1)
            return true;
        return false;
    }
    
    static int[][] zeroMatrix(int[][] arr) //MxN
    {
        int rowChecker=0;
        int columnChecker=0;
        
        int m=arr.length;
        int n=arr[0].length;
        
        for(int x=0; x<m; x++)
        {
            for(int y=0; y<n; y++)
            {
                if(arr[x][y]==0)
                {
                    rowChecker=rowChecker|(1<<x);
                    columnChecker=columnChecker|(1<<y);
                }
            }
        }
        
        int[][] result=new int[m][n];
        
        for(int x=0; x<m; x++)
        {
            if(mustSkip(rowChecker, x))
                continue;
                
            for(int y=0; y<n; y++)
            {
                if(mustSkip(columnChecker, y))
                    continue;
                
                result[x][y]=arr[x][y];
            }
        }
        
        return result;
    }
    
	public static void main(String[] args) 
	{
	    
	    int[][] arr={{1, 2, 66, 3}, {4, 4, 0, 2}, {1, 78, 1, 9}, {0, 1, 2, 3}};
	    arr=zeroMatrix(arr);
	    
		int rowEnd=arr.length;
		int columnEnd=arr[0].length;
		
		for(int x=0; x<rowEnd; x++)
		{
		    for(int y=0; y<columnEnd; y++)
		        System.out.printf(\"%d \", arr[x][y]);
	        System.out.printf(\"\n\");
		}
	}
}
```
</br>

## 1.9 String Rotation
``` java
public class Main
{
    static Boolean stringRotation(String token, String rotatedToken)
    {
        int lengthToken=token.length();
        
        if(lengthToken!=rotatedToken.length())
            return false;
        
        for(int x=lengthToken-1; x>=0; x--)
        {
            int indexToken=lengthToken-1;
            int indexRotatedToken=x;
            
            int y;
            for(y=0; y<lengthToken; y++)
            {
                if(token.charAt(Math.floorMod(indexToken--, lengthToken))!=
                    rotatedToken.charAt(Math.floorMod(indexRotatedToken--, lengthToken)))
                    break;
            }
            
            if(y==lengthToken)
                return true;
        }
        
        return false;
    }

	public static void main(String[] args) 
	{
        System.out.printf(\"%s\", stringRotation(\"qwerasdf\", \"fqwerasd\"));
	}
}
```", "2021.09.27 16:57", "Notes", "https://images.unsplash.com/photo-1537884944318-390069bb8665?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29kZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80");











INSERT INTO POST values(1, "Implementation of Full Stack Blog Project","
In this project I decided once and for all to immerse myself in the world of the backend. I have had experience with react before but never in all the projects in which I have used it have I made a backend.

The first big problem I encountered was choosing the type of database that I would implement here, I really wanted to use a relational database but I knew that doing that would make it very difficult for me to continue the project because I had no idea of What was I going to do with the host issue and partly that I had never had experience with a relational base in a project like this (I do not count one of .net that I have because thanks to blazor and the entity framework they solve and solve many things that I should have learned to do it manually). I saw that mongoDB provided good functionalities and its free version was sufficient for this project but I wanted to implement something really workable already using everything I learned in the database course at university.

![](https://ichi.pro/assets/images/max/724/1*a12jcIx2aBvavjGMht777Q.png)

In the end I decided to jump into the pool and once and for all learn to manage to learn faster, in the subject of the uni I only used microsoft sql server and this made this adventure bigger, because I looked at the free hosts that circulate around the network normally accepts databases designed with mysql. I was one day thinking about what to use for the backend, on the one hand because I liked java I wanted to use the spring frame, but on the other hand the host issue had me discouraged, so I decided that day to prepare the page with react without thinking about what the rest.

The next day, having something basic in hand, I decided to investigate, I saw that the leading framework for this year was laravel for the backend.

<iframe width='560' height='315' src='https://www.youtube.com/embed/57awvPsBE0w' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>

I had already heard many complaints about php and many others say that it was dying, but the truth is that it was striking for me to learn even the basics. I decided to look at the course on the sololearn page because it was always brief in its courses and at the same time to look at o'reilly's books. 2 days later I felt ready, I started to get into the adventure of communication between the frontend and the backend (without using the laravel frame, the purpose was to have a base to be able to learn the frame in the future if necessary).

![](https://bernardoayala.com/img/frontend-vs-backend.webp)

I had many doubts about how the server accepted the client's requests and how it accepted POST actions and I am very happy to have implemented php in this project, it is not that I do an incredible job there but at least I am happy with some solutions that I implement for some cases so I will only explain those solutions.

</br>
</br>
</br>
</br>

## Database Design

![](https://drive.google.com/uc?id=1cv7cR4UbBa7yexA6A3t1L1YU6aaOA66I)

As you can see in the diagram, the base is very basic, but sufficient for all the inconveniences that could arise. For the management of the posts that I do it was obvious that I needed the POST and CATEGORY entities, the attributes that they contain that are also seen were also obvious that I needed them so I am not going to go into detail about them, I think the strong point of all this it is everything related to the USER_COMMENT table so I am going to delve into this table.

It is obvious that in this table, looking at it logically, the attributes related to geolocation are highlighted so I will get to the point with them, I decided to require these attributes to somehow **avoid customer spam**.

I looked at free comment services such as disqus but they did not convince me, aesthetically they will look very good but after not making a system I did not make sense to use them, so after thinking I decided to make a basic system such that every time a client do a POST action, the client's ip will be checked in the database if the client reached a limit of comments chosen by me **on that day**.

I also want to emphasize that I thought up to the issue of the dates of the comments, I mean the time difference, so **whenever someone comments on a post I will always save the time zone of that client so that whenever I show a comment to another client can They adapt the dates of the comments to the time zone of that client**.

| ![](https://drive.google.com/uc?id=1sw23OpEUm3n1A7jgQ-kwGdQB3r3zzHSN) | ![](https://drive.google.com/uc?id=1jYRuTE5sMaEbENZGQS2mJmRCRxHvfzBT)| 
|:---:|:---:|

</br>
</br>

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

</br>
</br>

## PHP Implementation in The Server Side

The important points of the server are that it only accepts POST requests from the domain of this page, also that the server has been designed using the implementation of the model view controller (MVC) architecture. **To protect the information of the users I never expose out the attributes of their countries and IPs**.

#### Database.php
``` php
<?php
    class Database
    {
        private $database;

        private $serverName='localhost';
        private $userName='root';
        private $password='Yamahapacifica112j';
        private $nameOfDatabase='BLOG'; 

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

</br>

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

</br>

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
</br> 

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

</br>
</br>

## React Implementation in The Client Side

For the content reading issue, I have used the [react-markdown](https://github.com/remarkjs/react-markdown), [remark-gfm](https://github.com/remarkjs/remark-gfm) and [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) libraries, because it facilitates both the editing and the display of the content, I name these libraries because the truth It has fascinated me that thanks to them, great things can be done in a short time.

On the client side, I would only like to highlight one thing, I have even thought about the issue of a wrong url, as I have shown before in the server part to show a post, the only thing that is necessary is to give its ID, but what if would there be a wrong title in the url? For this reason on the client side I control if the title also matches the content of the database, based on that the content is loaded or if the user is not told that the post he is requesting does not exist.

All the other scripts that I have not shown you can see them in my github.

</br>
</br>

## Host

The host is completely free, the database is on [clever-cloud](https://www.clever-cloud.com/en/), the php scripts are on [heroku](https://www.heroku.com/) and the static page on the github pages.
", "2021.09.27 17:30", "Projects", "https://madrov.com/blog/content/images/2021/08/que-es-un-blog-.png");











INSERT INTO POST values(2, "My solutions from chapter two of the book 'Cracking the Coding Interview'","
For now in this chapter I have only asked the question ** 2.4 Partition **, when I solve it I will provide my solution here.

## 2.1 Remove Duplicates
``` java
class Node
{
    int value;
    Node next=null;
    
    public Node(int value)
    {
        this.value=value;
    }
    
    public void append(int value)
    {
        Node added=new Node(value);
        Node traveler=this;
        
        while(traveler.next!=null)
            traveler=traveler.next;
        
        traveler.next=added;
    }
}

public class Main
{
    static void removeDuplicates(Node head)
    {
        Node pivot=head;
        
        while(pivot.next!=null)
        {
            Node traveler=pivot;
            
            while(traveler.next.next!=null)
            {    
                if(traveler.next.value==pivot.value)
                {
                    traveler.next=traveler.next.next;
                    continue;
                }
                    
                traveler=traveler.next;
            }
            
            if(pivot.value==traveler.next.value)
                traveler.next=null;
            
            pivot=pivot.next;
        }
    }
    
	public static void main(String[] args) 
	{
	    Node node=new Node(5);
	    node.append(1);
	    node.append(1);
	    node.append(4);
	    node.append(5);
	    node.append(1);
	        
        removeDuplicates(node);
	    
	    while(node!=null)
	    {
		    System.out.println(node.value);
		    node=node.next;
	    }
	}
}
```

## 2.2 Return Kth to Last
``` java
class Node
{
    int value;
    Node next=null;
    
    public Node(int value)
    {
        this.value=value;
    }
    
    public void append(int value)
    {
        Node added=new Node(value);
        Node traveler=this;
        
        while(traveler.next!=null)
            traveler=traveler.next;
        
        traveler.next=added;
    }
}

public class Main
{
    static int length=0;
    static void returnKthToLast(Node head, int index, int k) //Min 2 elements there must be
    {
        if(head!=null )
        {
            length++;
            returnKthToLast(head.next, index+1, k);
        }
        
        if((length-index)==k)
            System.out.println(head.value);
    }
    
	public static void main(String[] args) 
	{
	    Node node=new Node(5);
	    node.append(1);
	    node.append(1);
	    node.append(4);
	    node.append(5);
	    node.append(1);
	        
        returnKthToLast(node, 1, 2);
	}
}
```

## 2.3 Delete Middle Node
``` java
class Node
{
    int value;
    Node next;
    
    public Node(int value)
    {
        this.value=value;
    }
    
    public void append(int value)
    {
        Node traveler=this;
        
        while(traveler.next!=null)
            traveler=traveler.next;
        
        Node newNode=new Node(value);    
        traveler.next=newNode;
    }
    
    public void deleteThis()
    {
        if(this.next==null)
            System.out.printf('FAIL\n');
        else
        {
            Node next=this.next;
            this.value=next.value;
            this.next=next.next;
        }
    }
}

public class Main
{
	public static void main(String[] args)
	{
		Node head=new Node(1);
        head.append(2);
        head.append(3);
        head.append(4);
        head.append(5);
        head.append(6);
        
        head.next.next.next.next.deleteThis();
        
        Node traveler=head;
        while(traveler!=null)
        {
            System.out.printf('%d ', traveler.value);
            traveler=traveler.next;
        }
	}
}
```

## 2.5 Sum Lists
``` java
class Node
{
    int value;
    Node next;
    
    public Node(int value)
    {
        this.value=value;
    }
    
    public void append(int value)
    {
        Node traveler=this;
        
        while(traveler.next!=null)
            traveler=traveler.next;
            
        traveler.next=new Node(value);
    }
    
    public void read()
    {
        Node traveler=this;
        
        while(traveler!=null)
        {
            System.out.printf('%d ', traveler.value);
            traveler=traveler.next;
        }
    }
}

public class Main
{
    static Node reverseSum(Node xNumb, Node yNumb)
    {
        Node head=new Node(0); //Null start
        
        Node traveler=head;
        Node xTraveler=xNumb;
        Node yTraveler=yNumb;
        
        int inHand=0;
        
        while(xTraveler!=null && yTraveler!=null)
        {
            int sum=xTraveler.value+yTraveler.value+inHand;
            traveler.next=new Node(sum%10);
            inHand=sum/10;
            
            traveler=traveler.next;
            xTraveler=xTraveler.next;
            yTraveler=yTraveler.next;
        }
        
        Node zTraveler=(xTraveler!=null)? xTraveler : yTraveler;
        
        while(zTraveler!=null)
        {
            int sum=zTraveler.value+inHand;
            traveler.next=new Node(sum%10);
            inHand=sum/10;
            
            traveler=traveler.next;
            zTraveler=zTraveler.next;
        }
        
        if(inHand==1)
            traveler.next=new Node(inHand);
    
        return head.next;
    }
    
    static int buildInteger(Node head)
    {
        int number=head.value;
        head=head.next;
        
        while(head!=null)
        {
            number=10*number+head.value;
            head=head.next;
        }
        
        return number;
    }
    
    static Node buildNode(int number)
    {
        if(number/10==0)
            return new Node(number);
        
        Node head=buildNode(number/10);
        head.append(number%10);
        return head;
    }
    
	public static void main(String[] args) 
	{
	    Node xNode=new Node(5);
	    xNode.append(9);
	    xNode.append(2);
	    
	    Node yNode=new Node(7);
	    yNode.append(1);
	    yNode.append(6);
	    
        	    
	    int xNumber=buildInteger(xNode);
	    int yNumber=buildInteger(yNode);
	    
	    Node result=buildNode((xNumber+yNumber));
	    result.read();
	}
}

```

## 2.6 Palindrome
``` java
class Node
{
    int value;
    Node next;
    
    public Node(int value)
    {
        this.value=value;
    }
    
    public void append(int value)
    {
        Node traveler=this;
        
        while(traveler.next!=null)
            traveler=traveler.next;
            
        traveler.next=new Node(value);
    }
    
    public void read()
    {
        Node traveler=this;
        
        while(traveler!=null)
        {
            System.out.printf('%d ', traveler.value);
            traveler=traveler.next;
        }
    }
}

public class Main
{
    static Boolean checker(Node[] head, Node tail)
    {
        Boolean isStartAndFinalEqual=true;
        
        if(tail.next!=null)
            isStartAndFinalEqual=checker(head, tail.next);
        
        if(head[0].value==tail.value && isStartAndFinalEqual)
        {
            head[0]=head[0].next;
            return true;
        }
            
        return false;
    }
    
    static Boolean isPalindrome(Node node)
    {
        return checker(new Node[]{node}, node); //pass by reference
    }
    
    static void memory(Node node){node.value=node.next.value;}
    
	public static void main(String[] args) 
	{
	   Node node=new Node(1);
	   node.append(2);
	   node.append(32);
	   node.append(2);
	   node.append(1);
	   
	   System.out.println(isPalindrome(node));
	}
}
```

## 2.7 Intersection
``` java
import java.util.HashSet;

class Node
{
    int value;
    Node next;
    
    public Node(int value)
    {
        this.value=value;
    }
    
    public void append(int value)
    {
        Node traveler=this;
        
        while(traveler.next!=null)
            traveler=traveler.next;
        
        traveler.next=new Node(value);
    }
}

public class Main
{
    public static Node intersection(Node firstHead, Node secondHead)
    {
        HashSet<Integer> set=new HashSet<>();
        
        Node traveler=firstHead;
        while(traveler!=null)
        {
            set.add(traveler.hashCode());
            traveler=traveler.next;
        }
        
        traveler=secondHead;
        while(traveler!=null)
        {
            if(set.contains(traveler.hashCode()))
                return traveler;
            traveler=traveler.next;
        }
        
        traveler=null;
        return traveler;
    }
    
	public static void main(String[] args) 
	{
	    Node firstHead=new Node(1);
	    firstHead.append(2);
	    firstHead.append(3);
	    firstHead.append(4);
	    firstHead.append(5);
	    
	    Node secondHead=new Node(10);
	    secondHead.append(9);
	    secondHead.append(8);
	    
	    secondHead.next.next.next=firstHead.next.next.next;
	    
		System.out.println(intersection(firstHead, secondHead));
	}
}
```

## 2.8 Loop Detection
``` java
import java.util.HashSet;

class Node
{
    int value;
    Node next;
    
    public Node(int value)
    {
        this.value=value;
    }
    
    public void append(int value)
    {
        Node added=new Node(value);
        Node traveler=this;
        
        while(traveler.next!=null)
            traveler=traveler.next;
        
        traveler.next=added;
    }
    
    public void setNext(Node node)
    {
        this.next=node;
    }
}

public class Main
{
    static Node getLoopHead(Node head)
    {
        HashSet<Integer> set = new HashSet<>();
        
        while(head!=null)
        {
            if(set.contains(head.hashCode()))
                break;
                
            set.add(head.hashCode());
            head=head.next;
        }
        
        if(head==null)
        {
            head=new Node(-1);
            System.out.println('No loop finded...');
        }
        
        return head;
    }
    
    public static void main(String[] args) 
	{
    	Node head=new Node(1);
    	head.append(2);
    	head.append(3);
    	head.append(4);
    	head.append(5);
    	
    	head.next.next.next.next.setNext(head.next); //5->2

        Node result=getLoopHead(head);
	    System.out.println(result.value);
    	
	}
}
```
", "2021.09.27 17:25", "Notes", "https://i.ytimg.com/vi/VspJE1kTBpQ/maxresdefault.jpg");








INSERT INTO POST values(3,  "New songs of Spiritbox, Animals as Leaders and nostalgia for times when I played and recorded my songs", "
Before the new song of [animals as leaders](https://www.youtube.com/watch?v=1Gi5KtoWY8U) had come out but just when I started doing this blog I came across the nice surprise that spiritbox released a new album, I was not a big fan of this band but I guess not seeing News in recent times in prog metal I ended up listening to them, I know that their genre is also prog but I don't know why they have always sounded different to this genre (call me crazy).

<iframe width='560' height='315' src='https://www.youtube.com/embed/8MP4QxsFICM' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>

I was fascinated with the album, I think that I had only experienced this feeling with plini's kind album, something that when I remember it I create nostalgia, nostalgia for remembering that at some time I could record some songs and practice.

Since the pandemic began, I have tried to keep myself motivated as much as possible for the future, be it from work or from new social experiences. Especially this year I have tried to learn things that I may not have been able to learn in the absence of a pandemic.

[](https://aat-comment.s3.amazonaws.com/prod/uploads/2014/07/517381.jpg)

It may all sound very good, but at the same time by doing this I have realized that I have forgotten things like recordings, etc.
Every day I feel motivated to continue and learn something new about computer science or do something social and for this reason I really don't want to record much. Like I said, the nostalgia that I suffered at the same time gave me happiness, because it made me remember that about 2-3 years ago there was a teenager who had no idea that he would focus on other things in the future.

<iframe width='560' height='315' src='https://www.youtube.com/embed/VVAu9IaMs9g' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>

<iframe width='560' height='315' src='https://www.youtube.com/embed/pWSgp1zUlbI' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>

I specifically put these two songs on the previous day and the truth is that they made me want to continue with a desire that I had in high school, to be able to have a hobby band. I also have in mind to continue composing and recording when I feel ready and motivated enough again, but the truth is that it is a very difficult task, I dont have bass or keyboard, which made it very difficult for me at the time to make those recordings, all of them. they were recorded with just a guitar, a medium quality sound card, and some VSTs.

Putting this issue aside, I look forward to the release of the new animals as leaders album, maybe when the album comes out, listening to it will take away all the desire for everything I have said, because the monster of tosin really is from another world, as I have said, there may not have been many new features in the prog, but I must admit that some guitarists have gone to another level, tosin was already there, but on the other hand, manuel gardner and polyphia have made themselves quite noticeable, not because of ibanez advertisements, if not for the new implementations (I speak for tim) of their techniques and the new content that they have been publishing.

I have not named plini or intervals because the truth is I do not know why but his new albums did not fascinate me like the others he has, if I must admit that there are 2 or 3 songs of each one that I liked very much, but speaking in full with The albums did not give me the sensation that their albums KIND and THE WAY FORWARD would give me, but I also leave here the songs which I think were the best of their albums

<iframe width='560' height='315' src='https://www.youtube.com/embed/tH-cDIk8eY0' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>

<iframe width='560' height='315' src='https://www.youtube.com/embed/uMYJjSWaTag' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>

<iframe width='560' height='315' src='https://www.youtube.com/embed/f4KCAzK8X0Q' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>

<iframe width='560' height='315' src='https://www.youtube.com/embed/tIBVpDWPnAI' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>

<iframe width='560' height='315' src='https://www.youtube.com/embed/p8cGceHp9lU' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>

<iframe width='560' height='315' src='https://www.youtube.com/embed/IpjpgbmwEkM' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>", 
"2021.09.27 18:00", "Music", "https://verikuu.com/wp-content/uploads/2021/08/spiritbox.jpg");