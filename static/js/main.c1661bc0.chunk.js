(this["webpackJsonppersonal-web"]=this["webpackJsonppersonal-web"]||[]).push([[0],{104:function(e,t,n){},105:function(e,t,n){},107:function(e,t,n){},339:function(e,t,n){},340:function(e,t,n){"use strict";n.r(t);var a=n(3),c=n.n(a),r=n(75),s=n.n(r),i=n(40),o=n(10),l=n(19),u=(n(97),n(2));function j(){var e=Object(o.e)();function t(t){switch(t){case"blog":e.push("");break;case"projects":e.push("/projects");break;case"about":e.push("/about")}}return Object(u.jsxs)("div",{children:[Object(u.jsxs)("div",{className:"headerArea",children:[Object(u.jsx)("div",{className:"headerTitleArea",children:Object(u.jsx)("span",{className:"title",children:"Andres \nArturo \nRodriguez \nCalderon"})}),Object(u.jsx)("div",{className:"verticalLine"}),Object(u.jsx)("img",{className:"headerImage",src:"https://drive.google.com/uc?id=1pgByDR1LKavmj_hHA1PcPvfiv5CxY2w1"}),Object(u.jsxs)("ul",{className:"listHeaderCategories",children:[Object(u.jsx)("li",{children:Object(u.jsx)("div",{className:"headerCategoryArea",children:Object(u.jsx)("span",{className:"headerCategoryFont",onClick:function(){t("blog")},children:"Blog"})})}),Object(u.jsx)("li",{children:Object(u.jsx)("div",{className:"headerCategoryArea",children:Object(u.jsx)("span",{className:"headerCategoryFont",onClick:function(){t("projects")},children:"Projects"})})}),Object(u.jsx)("li",{children:Object(u.jsx)("div",{className:"headerCategoryArea",children:Object(u.jsx)("span",{className:"headerCategoryFont",onClick:function(){t("about")},children:"About"})})})]})]}),Object(u.jsx)("div",{className:"horizontalLine"})]})}n(104);var d=function(){return Object(u.jsx)("div",{children:Object(u.jsx)("div",{className:"footer",children:Object(u.jsxs)("div",{className:"footerSocialIconsArea",children:[Object(u.jsx)("a",{href:"https://github.com/andresrodriguez55",target:"_blank",children:Object(u.jsx)("i",{className:"fab fa-github"})}),Object(u.jsx)("a",{href:"https://www.linkedin.com/in/andr%C3%A9s-arturo-rodr%C3%ADguez-calder%C3%B3n-623873197/",target:"_blank",children:Object(u.jsx)("i",{className:"fab fa-linkedin"})}),Object(u.jsx)("a",{href:"mailto:andrescalderonn1995@gmail.com",target:"_blank",children:Object(u.jsx)("i",{className:"fas fa-envelope"})}),Object(u.jsx)("a",{href:"https://www.hackerrank.com/andrescalderon55",target:"_blank",children:Object(u.jsx)("i",{className:"fab fa-hackerrank"})}),Object(u.jsx)("a",{href:"https://www.mathworks.com/matlabcentral/cody/players/23052170",target:"_blank",children:Object(u.jsx)("i",{className:"fa fa-square-root-alt"})}),Object(u.jsx)("a",{href:"https://www.kaggle.com/andrescalderon55",target:"_blank",children:Object(u.jsx)("i",{className:"fab fa-kaggle"})})]})})})},h=(n(105),"https://personalblog55.herokuapp.com/");function m(){var e=Object(o.e)();var t="/"==Object(o.f)().pathname?"All":"Projects",n=c.a.useState(t),a=Object(l.a)(n,2),r=a[0],s=a[1],i=c.a.useState([]),m=Object(l.a)(i,2),b=m[0],p=m[1],f=c.a.useState([]),x=Object(l.a)(f,2),O=x[0],v=x[1],g=c.a.useState(4),N=Object(l.a)(g,2),C=N[0],k=N[1];c.a.useEffect((function(){w(),"All"==t&&y()}),[]);var y=function(){fetch("https://personalblog55.herokuapp.com//Category/ReadCategoriesOfPosts.php").then((function(e){e.text().then((function(e){var t=JSON.parse(e);p(t)}))})).catch((function(e){return alert("Database connection error...")}))},w=function(){fetch(h+"/Post/ReadByCategory.php"+("All"==r?"":"?Category="+r)).then((function(e){e.text().then((function(e){var t=JSON.parse(e);v(t)}))})).catch((function(e){return alert("Database connection error...")})),S()},P=function(){S(),k((function(e){return e+4}))},S=function(){O.length<=C&&(document.getElementById("morePostsButton").style.display="none")};return Object(u.jsxs)("div",{children:[Object(u.jsx)(j,{}),Object(u.jsxs)("div",{children:[function(){if("All"==t)return Object(u.jsx)("div",{class:"displayCategories",children:Object(u.jsxs)("select",{id:"selectedCategory",onChange:function(){!function(){var e=document.getElementById("selectedCategory"),t=e.options[e.selectedIndex].value;s(t)}()},children:[Object(u.jsx)("option",{value:"All",children:"All"}),b.map((function(e){return Object(u.jsx)("option",{value:e.NameOfCategory,children:e.NameOfCategory})}))]})})}(),Object(u.jsxs)("div",{children:[Object(u.jsx)("div",{className:"posts",children:O.slice(0,C).map((function(t){if("All"==r||t.Category==r)return Object(u.jsxs)("div",{className:"postGrid",onClick:function(){var n,a;n=t.ID.toString(),a=t.Title,e.push("post/"+n+"/"+a.replace(" ","%20"))},children:[Object(u.jsx)("img",{className:"postGridImage",src:t.CoverPhotoLink}),Object(u.jsxs)("div",{className:"postGridInformation",children:[Object(u.jsx)("h2",{className:"postGridTitle",children:t.Title}),Object(u.jsx)("p",{className:"postGridCategory",children:"Category: "+t.Category}),Object(u.jsx)("p",{className:"postGridDate",children:t.PostDate})]})]})}))}),Object(u.jsx)("div",{className:"morePostsButtonArea",children:Object(u.jsx)("button",{className:"morePostsButton",id:"morePostsButton",onClick:P,children:"More"})})]})]}),Object(u.jsx)(d,{})]})}var b=n(13),p=n.n(b),f=n(29),x=n(55),O=n(56),v=n(353),g=n(84),N=n(90),C=n(78),k=(n(107),n(79)),y=n.n(k);function w(){var e=Object(o.f)().pathname.split("/"),t=e[2],n=e[3],a=c.a.useState([]),r=Object(l.a)(a,2),s=r[0],i=r[1],m=c.a.useState(!0),b=Object(l.a)(m,2),k=b[0],w=b[1],P=c.a.useState([]),S=Object(l.a)(P,2),A=S[0],D=S[1],I=c.a.useState("0.0.0.0"),T=Object(l.a)(I,2),L=T[0],_=T[1];c.a.useEffect(Object(f.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E();case 2:return e.next=4,B();case 4:return e.next=6,M();case 6:case"end":return e.stop()}}),e)}))),[]);var B=function(){var e=Object(f.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!k){e.next=3;break}return e.next=3,fetch("https://api.db-ip.com/v2/free/self",{method:"GET"}).then(function(){var e=Object(f.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json().then((function(e){_(e.ipAddress)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Fatal error...")}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(f.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(h+"/Post/ReadConcrete.php?ID="+t.toString()).then(function(){var e=Object(f.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);i(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Post content error! Database connection error...")}));case 2:0==s.length&&w(!1);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),M=function(){var e=Object(f.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(h+"/UserComment/ReadForConcretePost.php?PostID="+t.toString()).then(function(){var e=Object(f.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);D(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Comments error! Database connection error...")}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),R=function(e){return Object(u.jsx)(v.a,{style:g.a,language:e.className?e.className.substring(9):"",children:e.children?e.children:""})};return Object(u.jsxs)("div",{children:[Object(u.jsx)(j,{}),Object(u.jsx)("div",{children:s&&s.Title===n.replace("%20"," ")?Object(u.jsxs)("div",{children:[Object(u.jsx)("div",{className:"PostArea",children:Object(u.jsx)(x.a,{rehypePlugins:[O.a,N.a],components:{code:R},children:"<div className='postInfo'><img className='postImage' src='"+s.CoverPhotoLink+"'/><div className='postHeaderText'><h1 className='postTitle' align='center'>"+s.Title+"</h1><h6 className='postDate' align='center'>"+s.PostDate.substring(0,16)+"</h6></div></div>"+s.Content,className:y.a.reactMarkDown})}),Object(u.jsx)("div",{children:Object(u.jsxs)("div",{className:"commentsArea",children:[Object(u.jsxs)("form",{action:h+"/UserComment/Create.php",method:"POST",class:"commentsForm",children:[Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{className:"commentInputLabel",children:"Nick"}),Object(u.jsx)("input",{className:"nickInput",name:"Nick",id:"Nick",type:"text",placeholder:"Enter a nick...",autocomplete:"off",required:!0,minLength:3})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{className:"commentInputLabel",children:"Comment"}),Object(u.jsx)("input",{className:"commentInput",name:"Content",id:"Content",type:"text",placeholder:"Enter your comment...",autocomplete:"off",required:!0,minLength:2,maxLength:280})]}),Object(u.jsxs)("div",{className:"hiddenValues",children:[Object(u.jsx)("input",{name:"PostID",id:"PostID",type:"hidden",value:t}),Object(u.jsx)("input",{name:"IP",id:"IP",type:"hidden",value:L}),Object(u.jsx)("input",{name:"ClientURL",id:"ClientURL",type:"hidden",value:window.location.href})]}),Object(u.jsx)("div",{children:Object(u.jsx)("input",{className:"commentPostButton",name:"Submit",id:"Submit",type:"submit",value:"Post"})})]}),Object(u.jsx)("div",{className:"usersCommentsArea",children:A.map((function(e){var t=new Date(e.CommentDate+" "+Object(C.a)(e.TimeZone).utcOffsetStr);return Object(u.jsxs)("div",{className:"userCommentArea",children:[Object(u.jsx)("h4",{className:"userCommentNick",children:e.Nick}),Object(u.jsx)("p",{className:"userCommentContent",children:e.Content}),Object(u.jsx)("p",{className:"userCommentDate",children:t.toLocaleString("es-ES",{timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,day:"numeric",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1}).replaceAll("/",".")})]})}))})]})})]}):k?Object(u.jsx)("div",{children:Object(u.jsx)("h6",{style:{fontSize:"150%",fontWeight:"100"},align:"center",children:"Loading..."})}):Object(u.jsx)("h6",{style:{fontSize:"150%",fontWeight:"100"},align:"center",children:"POST NOT EXIST..."})}),Object(u.jsx)(d,{})]})}var P=n.p+"static/media/ContentAbout.65ebf484.md",S=n(89),A=n.n(S);function D(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],c=t[1];return fetch(P).then((function(e){return e.text()})).then((function(e){return c(e)})),Object(u.jsxs)("div",{children:[Object(u.jsx)(j,{}),Object(u.jsx)(x.a,{children:n,rehypePlugins:[O.a],className:A.a.reactMarkDown}),Object(u.jsx)(d,{})]})}n(339);var I=function(){return Object(u.jsxs)(i.a,{basename:"/",children:[Object(u.jsx)(o.a,{exact:!0,path:"/",component:m}),Object(u.jsx)(o.a,{exact:!0,path:"/projects",component:m}),Object(u.jsx)(o.a,{exact:!0,path:"/about",component:D}),Object(u.jsx)(o.a,{path:"/post/:id/:title",component:w})]})};s.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(I,{})}),document.getElementById("root"))},79:function(e,t,n){e.exports={reactMarkDown:"markdown-styles_reactMarkDown__x_VD4"}},89:function(e,t,n){e.exports={reactMarkDown:"markdown-styles_reactMarkDown__YNP4u"}},97:function(e,t,n){}},[[340,1,2]]]);
//# sourceMappingURL=main.c1661bc0.chunk.js.map