# Full Stack Blog With a Admin Panel And Comment System For Users With PHP, React & MYSQL

[LINK](https://andresrodriguez55.github.io/#/)


## Contents
- Database Design & SQL
- PHP Implementation in The Server Side
- Admin Panel
- React Implementation in The Client Side
- Host


## Database Design & SQL

![](https://drive.google.com/uc?id=1cv7cR4UbBa7yexA6A3t1L1YU6aaOA66I)

As you can see in the diagram, the base is very basic, but sufficient for all the inconveniences that could arise. For the management of the posts that I do it was obvious that I needed the POST and CATEGORY entities, the attributes that they contain that are also seen were also obvious that I needed them so I am not going to go into detail about them.

The BLOG_ADMIN table has no relationship with the POST table because **I will only be the admin, the table will be used to save my data, guaranteeing even more security in the backend (because if I saved it in some php document I could expose at some risk).**

**The USER_COMMENT table will save the IPs of the users in order to handle spam, users will be allowed to publish only 3 comments in one day, the number of comments per hour could be changed.** The country attribute will be used for general administration information.

![](https://drive.google.com/uc?id=1OXwy14lTQdQdsPLJzr2q0T6kYRJj4Tl3)

I also want to emphasize that I thought up to the issue of the dates of the comments, I mean the time difference, so **whenever someone comments on a post I will always save the time zone of that client so that whenever I show a comment to another client can adapt the dates of the comments to the time zone of that client**.

| ![](https://drive.google.com/uc?id=1sw23OpEUm3n1A7jgQ-kwGdQB3r3zzHSN) | ![](https://drive.google.com/uc?id=1jYRuTE5sMaEbENZGQS2mJmRCRxHvfzBT)| 
|:---:|:---:|

**This detail is also taken into account when the dates of the posts are shown to the user.**

| ![](https://drive.google.com/uc?id=1SiHjdHBO-VtZ2iin3vKMAMfZ3bWUBIZR) | ![](https://drive.google.com/uc?id=1IgSKtClvksRfri5yAaigM01ayJKp1k54)| 
|:---:|:---:|
| ![](https://drive.google.com/uc?id=1oXULGBAvd39--KpmosTPclulotbZRue1) | ![](https://drive.google.com/uc?id=1G3Cr88_7R_1MNtvUResQpQg8uFcPoEPI)| 

I do this by doing the conversions of hours on the client side, on the server the dates will be saved in the Istanbul timezone.

This is the script used to implement the creation of the database tables, constraints and triggers:

```SQL
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
	ID INT,
	Title VARCHAR(255) NOT NULL,
	Content TEXT(16000) NOT NULL, 
	PostDate DATETIME NOT NULL,
	Category VARCHAR(20),
    	CoverPhotoLink VARCHAR(2048), /* The maximum length of a URL in the address bar is 2048 characters. */

	PRIMARY KEY (ID),
	FOREIGN KEY (Category) REFERENCES CATEGORY(NameOfCategory) ON DELETE SET NULL ON UPDATE CASCADE,

	CONSTRAINT `MinimumPostID` CHECK(ID>=0),
	CONSTRAINT `MinimumTitleLength`CHECK(LENGTH(Title)>=3),
	CONSTRAINT `MinimumContentLength`CHECK(LENGTH(Content)>=40),
    	CONSTRAINT `MinimumCoverPhotoLength`CHECK(LENGTH(CoverPhotoLink)>=10)
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

		CONSTRAINT `MinimumCommentID`CHECK(ID>=0),
		CONSTRAINT `MinimumNickLength` CHECK(LENGTH(Nick)>=3),
		CONSTRAINT `MinimumCommentLength`CHECK(LENGTH(Content)>=2),
        	CONSTRAINT `MinimumIPLength` CHECK (LENGTH(IP)>=7),
        	CONSTRAINT `MinimumTimeZoneNameLength` CHECK (LENGTH(TimeZone)>=5),
        	CONSTRAINT `MinimumCountryNameLength` CHECK (LENGTH(Country)>=4)
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

As you can see, the triggers are oriented for me since they facilitate me to upload new content, right now they are no longer necessary to the admin panel that I have designed, which you will see more next in this post.
<br/>

## PHP Implementation in The Server Side

The important points of the server are that it only accepts POST requests from the domain of this page, also that the server has been designed using the implementation of the model view controller (MVC) architecture. **To protect the information of the users I never expose out the attributes of their countries and IPs**.

For the post actions related to administrative actions, they will **always be controlled with the user information**, so if, for example, a request is made to publish a post, the username and password of admin will also be expected, this is done to have greater security, also does not generate performance problems since there will only be one admin.

<br/>

## Admin Panel

To raise the level of the project I have decided to make an admin panel, so to be able to make a fully functional application for any client, the panel is completely designed for my personal use. 

Here is a demo:
[![Watch the video](https://drive.google.com/uc?id=1QVpYxVbqpA7aU-f4AsU2v3dJlom5Gxnc)](https://www.youtube.com/watch?time_continue=73&v=Nyqlh5KCj0M&feature=emb_title)

I can edit the nicknames and comments of the users (due in case I should delete some part of them) and directly delete the comments, I can add, edit and delete the categories and finally I can create, delete and edit the posts.

You could say that the admin panel is a CRUD application.

![](https://drive.google.com/uc?id=1qevRXezHca7hlC26WvJd9f4VWg8kqIpi)
![](https://drive.google.com/uc?id=1IFLHm0ZlmgIuVlC-xWoW57yVkcmrgbln)
![](https://drive.google.com/uc?id=10rhhtX2v3M1x5nvKGXj1Bg5jGmaFtJFR)

I have also put the statistics in the admin section before starting the session, I do this with the purpose of exposing them a little outwards.

![](https://drive.google.com/uc?id=1qheFvHKWyTJVwxfHIwLBZDVn-bvyvse3)

<br/>

## React Implementation in The Client Side

For the content reading issue, I have used the [react-markdown](https://github.com/remarkjs/react-markdown), [remark-gfm](https://github.com/remarkjs/remark-gfm) and [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) libraries, because it facilitates both the editing and the display of the content, I name these libraries because the truth It has fascinated me that thanks to them, great things can be done in a short time.

On the client side, I would only like to highlight one thing, I have even thought about the issue of a wrong url, as I have shown before in the server part to show a post, the only thing that is necessary is to give its ID, but what if would there be a wrong title in the url? For this reason on the client side I control if the title also matches the content of the database, based on that the content is loaded or if the user is not told that the post he is requesting does not exist.

<br/>

## Host

The host is completely free, the database is on [clever-cloud](https://www.clever-cloud.com/en/), the php scripts are on [heroku](https://www.heroku.com/) and the static page on the github pages.

![](https://drive.google.com/uc?id=1GSM58-YgNk8tEZuoWaxuiV0Vr0gTbjcR)
