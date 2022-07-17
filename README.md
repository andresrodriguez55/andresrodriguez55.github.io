**The project is under development, finishing some adjustments soon a longer explanation about the app will be written and apart from it the backend and frontend files will be given...**

[Repo Link](https://github.com/andresrodriguez55/andresrodriguez55.github.io)

## Contents
- Database Design
- <p style="text-decoration-line: line-through;">PHP Implementation in The Server Side</p>
- Admin Panel
- React Implementation in The Client Side
- Host

## Database Design

![](https://drive.google.com/uc?id=1cv7cR4UbBa7yexA6A3t1L1YU6aaOA66I)

As you can see in the diagram, the base is very basic, but sufficient for all the inconveniences that could arise. 	

I won't talk about conversion to relational schema because it is a very basic ER schema.

## <p style="text-decoration-line: line-through;"> PHP Implementation in The Server Side </p> ASP.NET Core Implementation In The Server Side

Previously I used very messy PHP scripts, now to start updating and improving the page I have transferred the code to ASP.NET. I use the Entity Framework to be able to develop the server faster. Some methods of the Rest Api need to be documented because for now in some methods I return objects, being objects without a detailed class swagger does not detect the json response type. Also missing is optimizing rewritten code and deleting some no longer used classes.

I would also like to emphasize that when a new post is published, such a function will be implemented backwards that works with the [sendgrid](https://sendgrid.com/) service, which helps to notify subscribed users about a new post, also giving in such email the option to unsubscribe from the blog.

Also if a user comments on a comment that has the option to receive notification checked, the user will receive a notification via email.

<br/>

## Admin Panel

### (Old pic of old design):

![](https://drive.google.com/uc?id=1QVpYxVbqpA7aU-f4AsU2v3dJlom5Gxnc)

To raise the level of the project I have decided to make an admin panel, so to be able to make a fully functional application for any client, the panel is completely designed for my personal use. 

### (Old video of old design):

<iframe width='560' height='315' src='https://www.youtube.com/embed/Nyqlh5KCj0M' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>

**The content of the posts is markdown type, this is because it makes it very easy to write new posts, in addition html content is also accepted, in the frontend I adapt the positions and sizes of images and videos, which makes everything even easier. In addition, I have also incorporated a markdown content viewer on the right which exactly emulates the client's view.**

I can edit the nicknames and comments of the users (due in case I should delete some part of them) and directly delete the comments, I can add, edit and delete the categories and finally I can create, delete and edit the posts.

You could say that the admin panel is a CRUD application.

### (Old pics of old design):
![](https://drive.google.com/uc?id=1qevRXezHca7hlC26WvJd9f4VWg8kqIpi)
![](https://drive.google.com/uc?id=1IFLHm0ZlmgIuVlC-xWoW57yVkcmrgbln)
![](https://drive.google.com/uc?id=10rhhtX2v3M1x5nvKGXj1Bg5jGmaFtJFR)

I have also put the statistics in the admin section before starting the session, I do this with the purpose of exposing them a little outwards.

### (Old pic of old design):
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