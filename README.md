# Implementation of a Full Stack Blog With Administration Panel, Notification System and Comment System With PHP, React & MYSQL

[FULL DOCUMENTATION](https://andresrodriguez55.github.io/#/post/1/Implementation%20of%20a%20Full%20Stack%20Blog%20With%20a%20Comment%20System%20And%20Admin%20Panel%20With%20PHP,%20React%20&%20MYSQL)

[SITE LINK](https://andresrodriguez55.github.io/#/)

## Contents
- Database Design
- PHP Implementation in The Server Side
- Admin Panel
- React Implementation in The Client Side
- Host


## Database Design

![](https://drive.google.com/uc?id=1cv7cR4UbBa7yexA6A3t1L1YU6aaOA66I)

As you can see in the diagram, the base is very basic, but sufficient for all the inconveniences that could arise. For the management of the posts that I do it was obvious that I needed the POST and CATEGORY entities, the attributes that they contain that are also seen were also obvious that I needed them so I am not going to go into detail about them.

The BLOG_ADMIN table has no relationship with the POST table because **I will only be the admin, the table will be used to save my data, guaranteeing even more security in the backend (because if I saved it in some php document I could expose at some risk).**

**The USER_COMMENT table will save the IPs of the users in order to handle spam, users will be allowed to publish only 3 comments in one day, the number of comments per hour could be changed.** The country attribute will be used for general administration information.

![](https://drive.google.com/uc?id=1OXwy14lTQdQdsPLJzr2q0T6kYRJj4Tl3)

Also in table SUSRIBED_EMAILS the ip will be saved to lower the chances of having an overload in the database.

![](https://drive.google.com/uc?id=1ENkghFhPpSByKaB4QUWXcmYx7PKnzsBn)

I will not go into detail about the SQL scripts, they can be seen in the repository of this project on [github](https://github.com/andresrodriguez55/andresrodriguez55.github.io).

<br/>

## PHP Implementation in The Server Side

Within the scripts, there is one that works in context mode, which helps to implement the connection with the database.

There are objects which represent each entity in the database,
Each object contains a function focused on the needs of the page, each object will receive an instance of a context object which will help to connect to the database.

Finally there are the scripts which have the function of receiving HTTP requests and being able to respond to them.

The scripts used for administrator actions are special since whenever a get or post request is made referring to an administrator operation, administrator account values will be expected, it is not very correct to do this but it **increases the security in these operations.**

I would also like to emphasize that when a new post is published, such a function will be implemented backwards that works with the [sendgrid](https://sendgrid.com/) service, which helps to notify subscribed users about a new post, also giving in such email the option to unsubscribe from the blog.

<br/>

## Admin Panel

![](https://drive.google.com/uc?id=1QVpYxVbqpA7aU-f4AsU2v3dJlom5Gxnc)

To raise the level of the project I have decided to make an admin panel, so to be able to make a fully functional application for any client, the panel is completely designed for my personal use. 

[Here is a demo...](https://www.youtube.com/watch?v=Nyqlh5KCj0M)

**The content of the posts is markdown type, this is because it makes it very easy to write new posts, in addition html content is also accepted, in the frontend I adapt the positions and sizes of images and videos, which makes everything even easier. In addition, I have also incorporated a markdown content viewer on the right which exactly emulates the client's view.**

I can edit the nicknames and comments of the users (due in case I should delete some part of them) and directly delete the comments, I can add, edit and delete the categories and finally I can create, delete and edit the posts.

You could say that the admin panel is a CRUD application.

![](https://drive.google.com/uc?id=1qevRXezHca7hlC26WvJd9f4VWg8kqIpi)
![](https://drive.google.com/uc?id=1IFLHm0ZlmgIuVlC-xWoW57yVkcmrgbln)
![](https://drive.google.com/uc?id=10rhhtX2v3M1x5nvKGXj1Bg5jGmaFtJFR)

I have also put the statistics in the admin section before starting the session, I do this with the purpose of exposing them a little outwards.

![](https://drive.google.com/uc?id=1qheFvHKWyTJVwxfHIwLBZDVn-bvyvse3)

<br/>

## React Implementation in The Client Side

The subject of design and user experience was thought very basic, <u>this subject will be reviewed soon.</u>

For the content reading issue, I have used the [react-markdown](https://github.com/remarkjs/react-markdown), [remark-gfm](https://github.com/remarkjs/remark-gfm) and [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) libraries, because it facilitates both the editing and the display of the content, I name these libraries because the truth It has fascinated me that thanks to them, great things can be done in a short time.

On the client side, I would only like to highlight one thing, I have even thought about the issue of a wrong url, as I have shown before in the server part to show a post, the only thing that is necessary is to give its ID, but what if would there be a wrong title in the url? For this reason on the client side I control if the title also matches the content of the database, based on that the content is loaded or if the user is not told that the post he is requesting does not exist.

I also want to emphasize that I thought up to the issue of the dates of the comments, I mean the time difference, so **whenever someone comments on a post I will always save the time zone of that client so that whenever I show a comment to another client can adapt the dates of the comments to the time zone of that client**.

| ![](https://drive.google.com/uc?id=1sw23OpEUm3n1A7jgQ-kwGdQB3r3zzHSN) | ![](https://drive.google.com/uc?id=1jYRuTE5sMaEbENZGQS2mJmRCRxHvfzBT)| 
|:---:|:---:|

**This detail is also taken into account when the dates of the posts are shown to the user.**

| ![](https://drive.google.com/uc?id=1SiHjdHBO-VtZ2iin3vKMAMfZ3bWUBIZR) | ![](https://drive.google.com/uc?id=1IgSKtClvksRfri5yAaigM01ayJKp1k54)| 
|:---:|:---:|

I do this by doing the conversions of hours on the client side, on the server the dates will be saved in the Istanbul timezone.

<br/>

## Host

The host is completely free, the database is on [clever-cloud](https://www.clever-cloud.com/en/), the php scripts are on [heroku](https://www.heroku.com/) and the static page on the github pages.

![](https://drive.google.com/uc?id=1GSM58-YgNk8tEZuoWaxuiV0Vr0gTbjcR)
