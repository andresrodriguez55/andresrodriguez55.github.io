# FULLSTACK BLOG WITH A BASIC COMMENT SYSTEM (REACT, PHP & MYSQL)

[LINK](https://andresrodriguez55.github.io/#/)

## Database Design

![](https://drive.google.com/uc?id=1cv7cR4UbBa7yexA6A3t1L1YU6aaOA66I)

As you can see in the diagram, the base is very basic, but sufficient for all the inconveniences that could arise. For the management of the posts that I do it was obvious that I needed the POST and CATEGORY entities, the attributes that they contain that are also seen were also obvious that I needed them so I am not going to go into detail about them, I think the strong point of all this it is everything related to the USER_COMMENT table so I am going to delve into this table.

The BLOG_ADMIN table has no relationship with the POST table because **I will only be the admin, the table will be used to save my data, guaranteeing even more security in the backend (because if I saved it in some php document I could expose at some risk).**

It is obvious that in this table, looking at it logically, the attributes related to geolocation are highlighted so I will get to the point with them, I decided to require these attributes to somehow **avoid customer spam**.

I looked at free comment services such as disqus but they did not convince me, aesthetically they will look very good but after not making a system I did not make sense to use them, so after thinking I decided to **make a basic system such that every time a client do a POST action, the client's IP will be checked in the database if the client reached a limit of comments chosen by me on that day**.

![](https://drive.google.com/uc?id=1OXwy14lTQdQdsPLJzr2q0T6kYRJj4Tl3)

I also want to emphasize that I thought up to the issue of the dates of the comments, I mean the time difference, so **whenever someone comments on a post I will always save the time zone of that client so that whenever I show a comment to another client can adapt the dates of the comments to the time zone of that client**.

| ![](https://drive.google.com/uc?id=1sw23OpEUm3n1A7jgQ-kwGdQB3r3zzHSN) | ![](https://drive.google.com/uc?id=1jYRuTE5sMaEbENZGQS2mJmRCRxHvfzBT)| 
|:---:|:---:|

I do this by doing the conversions of hours on the client side, on the server the dates will be saved in the Istanbul timezone.

## PHP Implementation in The Server Side

The important points of the server are that it only accepts POST requests from the domain of this page, also that the server has been designed using the implementation of the model view controller (MVC) architecture. **To protect the information of the users I never expose out the attributes of their countries and IPs**.

## Admin Panel

![](https://drive.google.com/uc?id=1QVpYxVbqpA7aU-f4AsU2v3dJlom5Gxnc)

To raise the level of the project I have decided to make an admin panel, so to be able to make a fully functional application for any client, the panel is completely designed for my personal use. 

I can edit the nicknames and comments of the users (due in case I should delete some part of them) and directly delete the comments, I can add, edit and delete the categories and finally I can create, delete and edit the posts.

You could say that the admin panel is a CRUD application.

![](https://drive.google.com/uc?id=1qevRXezHca7hlC26WvJd9f4VWg8kqIpi)
![](https://drive.google.com/uc?id=1IFLHm0ZlmgIuVlC-xWoW57yVkcmrgbln)
![](https://drive.google.com/uc?id=10rhhtX2v3M1x5nvKGXj1Bg5jGmaFtJFR)

I have also put the statistics in the admin section before starting the session, I do this with the purpose of exposing them a little outwards.

![](https://drive.google.com/uc?id=1qheFvHKWyTJVwxfHIwLBZDVn-bvyvse3)

Finally I would like to highlight that **always before making a POST request the admin user data will be reviewed, this I do with all the purpose of being safe**.

## React Implementation in The Client Side

For the content reading issue, I have used the [react-markdown](https://github.com/remarkjs/react-markdown), [remark-gfm](https://github.com/remarkjs/remark-gfm) and [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) libraries, because it facilitates both the editing and the display of the content, I name these libraries because the truth It has fascinated me that thanks to them, great things can be done in a short time.

On the client side, I would only like to highlight one thing, I have even thought about the issue of a wrong url, as I have shown before in the server part to show a post, the only thing that is necessary is to give its ID, but what if would there be a wrong title in the url? For this reason on the client side I control if the title also matches the content of the database, based on that the content is loaded or if the user is not told that the post he is requesting does not exist.

## Host

The host is completely free, the database is on [clever-cloud](https://www.clever-cloud.com/en/), the php scripts are on [heroku](https://www.heroku.com/) and the static page on the github pages.

![](https://drive.google.com/uc?id=1GSM58-YgNk8tEZuoWaxuiV0Vr0gTbjcR)