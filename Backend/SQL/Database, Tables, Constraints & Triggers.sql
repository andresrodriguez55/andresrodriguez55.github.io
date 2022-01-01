CREATE DATABASE BLOG;

USE BLOG;

/* ---TABLES--- */
CREATE TABLE CATEGORY
(
	NameOfCategory VARCHAR(20),
	PRIMARY KEY (NameOfCategory),
	CONSTRAINT `MinimumNameOfCategory` CHECK(LENGTH(NameOfCategory)>=3)
);

CREATE TABLE POST
(
	ID INT AUTO_INCREMENT,
	Title VARCHAR(255) NOT NULL,
	Content TEXT(16000) NOT NULL, 
	PostDate DATETIME NOT NULL,
	Category VARCHAR(20),
    CoverPhotoLink VARCHAR(2048), /* The maximum length of a URL in the address bar is 2048 characters. */

	PRIMARY KEY (ID),
	FOREIGN KEY (Category) REFERENCES CATEGORY(NameOfCategory) ON DELETE SET NULL ON UPDATE CASCADE,

	CONSTRAINT `MinimumPostID` CHECK(ID>=1),
	CONSTRAINT `MinimumTitleLength`CHECK(LENGTH(Title)>=3),
	CONSTRAINT `MinimumContentLength`CHECK(LENGTH(Content)>=40),
    CONSTRAINT `MinimumCoverPhotoLength`CHECK(LENGTH(CoverPhotoLink)>=10)
);

CREATE TABLE USER_COMMENT
(
		ID INT AUTO_INCREMENT,
		PostID INT NOT NULL,
		Nick VARCHAR(30) NOT NULL, 
		Content VARCHAR(280) NOT NULL, /* La longitud maxima de un tweet de twiter es 280! */
		CommentDate DATETIME NOT NULL,
        IP VARCHAR(45) NOT NULL, /* The correct maximum IPv6 string length is 45! */
        Country VARCHAR(56), /* max: The United Kingdom of Great Britain and Northern Ireland (56) , min: 4*/

		PRIMARY KEY (ID),
		FOREIGN KEY (PostID) REFERENCES POST(ID) ON DELETE CASCADE ON UPDATE CASCADE,

		CONSTRAINT `MinimumCommentID`CHECK(ID>=1),
		CONSTRAINT `MinimumNickLength` CHECK(LENGTH(Nick)>=3),
		CONSTRAINT `MinimumCommentLength`CHECK(LENGTH(Content)>=2),
        CONSTRAINT `MinimumIPLength` CHECK (LENGTH(IP)>=7),
        CONSTRAINT `MinimumCountryNameLength` CHECK (LENGTH(Country)>=4)
);

CREATE TABLE SUSCRIBED_EMAILS
(
	Email VARCHAR(60), /* A maximum email can contain 320 characters, but to save space I have decided that the maximum accepted is 60 characters */
	IP VARCHAR(45) NOT NULL, /* The correct maximum IPv6 string length is 45! */
    SuscriptionDate DATETIME NOT NULL,
    
    PRIMARY KEY (Email),
    
	CONSTRAINT `Email` CHECK(LENGTH(Email)>=7), /*ex: a@a.com*/
    CONSTRAINT `SuscriptionMinimumIPLength` CHECK (LENGTH(IP)>=7)
);

CREATE TABLE BLOG_ADMIN
(
	AdminUsername VARCHAR(20), 
	AdminPassword VARCHAR(20) NOT NULL, 
    
    PRIMARY KEY (AdminUsername),
    
    CONSTRAINT `MinimumAdminUsernameLength`CHECK(LENGTH(AdminUsername)>=3),
	CONSTRAINT `MinimumAdminPasswordLength` CHECK(LENGTH(AdminPassword)>=3)
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
	THEN SET NEW.Category="Notes";
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
