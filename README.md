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

## PHP Implementation in The Server Side

The important points of the server are that it only accepts POST requests from the domain of this page, also that the server has been designed using the implementation of the model view controller (MVC) architecture. **To protect the information of the users I never expose out the attributes of their countries and IPs**.

## React Implementation in The Client Side

For the content reading issue, I have used the [react-markdown](https://github.com/remarkjs/react-markdown), [remark-gfm](https://github.com/remarkjs/remark-gfm) and [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) libraries, because it facilitates both the editing and the display of the content, I name these libraries because the truth It has fascinated me that thanks to them, great things can be done in a short time.

On the client side, I would only like to highlight one thing, I have even thought about the issue of a wrong url, as I have shown before in the server part to show a post, the only thing that is necessary is to give its ID, but what if would there be a wrong title in the url? For this reason on the client side I control if the title also matches the content of the database, based on that the content is loaded or if the user is not told that the post he is requesting does not exist.

## Host

The host is completely free, the database is on [clever-cloud](https://www.clever-cloud.com/en/), the php scripts are on [heroku](https://www.heroku.com/) and the static page on the github pages.

![](https://drive.google.com/uc?id=1GSM58-YgNk8tEZuoWaxuiV0Vr0gTbjcR)
