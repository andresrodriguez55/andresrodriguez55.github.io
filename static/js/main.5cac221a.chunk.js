(this["webpackJsonppersonal-web"]=this["webpackJsonppersonal-web"]||[]).push([[0],{225:function(e,t,n){e.exports={reactMarkDown:"markdown-styles_reactMarkDown__sUiWG"}},272:function(e,t,n){},278:function(e,t,n){},279:function(e,t,n){},280:function(e,t,n){},512:function(e,t,n){},618:function(e,t,n){},622:function(e,t,n){},623:function(e,t,n){},624:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(77),s=n.n(c),o=n(104),i=n(30),u=n(11),l=n.n(u),d=n(21),p=n(8),m=(n(272),n.p+"static/media/personAndGuitar.24374079.jpg"),h="http://localhost:3000/",f=n(2);function b(){var e=Object(i.e)();function t(){return n.apply(this,arguments)}function n(){return n=Object(d.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.db-ip.com/v2/free/self",{method:"GET"}).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json().then((function(e){return e.ipAddress}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Fatal error...")}));case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),n.apply(this,arguments)}function a(e){return r.apply(this,arguments)}function r(){return r=Object(d.a)(l.a.mark((function n(a){var r,c,s;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:n.t0=a,n.next="blog"===n.t0?3:"projects"===n.t0?5:"about"===n.t0?7:"subscribe"===n.t0?9:"admin"===n.t0?21:23;break;case 3:return e.push(""),n.abrupt("break",23);case 5:return e.push("/projects"),n.abrupt("break",23);case 7:return e.push("/about"),n.abrupt("break",23);case 9:if(null!=(r=prompt("Please enter the email to which you want to receive notifications about new posts:"))){n.next=12;break}return n.abrupt("return");case 12:return(c=new FormData).append("Email",r),n.next=16,t();case 16:return s=n.sent,c.append("IP",s),n.next=20,fetch(h+"SubscribedEmail/PostEmail.php",{method:"POST",body:c}).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){alert(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 20:return n.abrupt("break",23);case 21:return e.push("/admin"),n.abrupt("break",23);case 23:case"end":return n.stop()}}),n)}))),r.apply(this,arguments)}return Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{className:"headerArea",children:[Object(f.jsx)("div",{className:"headerTitleArea",children:Object(f.jsx)("span",{className:"title",children:"Andres \nArturo \nRodriguez \nCalderon"})}),Object(f.jsx)("div",{className:"verticalLine"}),Object(f.jsx)("img",{className:"headerImage",src:m}),Object(f.jsxs)("ul",{className:"listHeaderCategories",children:[Object(f.jsx)("li",{children:Object(f.jsx)("div",{className:"headerCategoryArea",children:Object(f.jsx)("span",{className:"headerCategoryFont",onClick:function(){a("blog")},children:"Blog"})})}),Object(f.jsx)("li",{children:Object(f.jsx)("div",{className:"headerCategoryArea",children:Object(f.jsx)("span",{className:"headerCategoryFont",onClick:function(){a("projects")},children:"Projects"})})}),Object(f.jsx)("li",{children:Object(f.jsx)("div",{className:"headerCategoryArea",children:Object(f.jsx)("span",{className:"headerCategoryFont",onClick:function(){a("about")},children:"About"})})}),Object(f.jsx)("li",{children:Object(f.jsx)("div",{className:"headerCategoryArea",children:Object(f.jsx)("span",{className:"headerCategoryFont",onClick:function(){a("subscribe")},children:"Suscribe"})})}),Object(f.jsx)("li",{children:Object(f.jsx)("div",{className:"headerCategoryArea",children:Object(f.jsx)("span",{className:"headerCategoryFont",onClick:function(){a("admin")},children:"Admin"})})})]})]}),Object(f.jsx)("div",{className:"horizontalLine"})]})}n(278);var j=function(){return Object(f.jsx)("div",{children:Object(f.jsx)("div",{className:"footer",children:Object(f.jsxs)("div",{className:"footerSocialIconsArea",children:[Object(f.jsx)("a",{href:"https://github.com/andresrodriguez55",target:"_blank",children:Object(f.jsx)("i",{className:"fab fa-github"})}),Object(f.jsx)("a",{href:"https://www.linkedin.com/in/andr%C3%A9s-arturo-rodr%C3%ADguez-calder%C3%B3n-623873197/",target:"_blank",children:Object(f.jsx)("i",{className:"fab fa-linkedin"})}),Object(f.jsx)("a",{href:"mailto:andrescalderonn1995@gmail.com",target:"_blank",children:Object(f.jsx)("i",{className:"fas fa-envelope"})}),Object(f.jsx)("a",{href:"https://www.hackerrank.com/andrescalderon55",target:"_blank",children:Object(f.jsx)("i",{className:"fab fa-hackerrank"})}),Object(f.jsx)("a",{href:"https://www.mathworks.com/matlabcentral/cody/players/23052170",target:"_blank",children:Object(f.jsx)("i",{className:"fa fa-square-root-alt"})}),Object(f.jsx)("a",{href:"https://www.kaggle.com/andrescalderon55",target:"_blank",children:Object(f.jsx)("i",{className:"fab fa-kaggle"})})]})})})};n(279);function x(){var e=Object(i.e)();var t="/"==Object(i.f)().pathname?"All":"Projects",n=r.a.useState(t),a=Object(p.a)(n,2),c=a[0],s=a[1],o=r.a.useState([]),u=Object(p.a)(o,2),m=u[0],x=u[1],O=r.a.useState([]),v=Object(p.a)(O,2),g=v[0],y=v[1],C=r.a.useState(!0),w=Object(p.a)(C,2),N=w[0],k=w[1],P=r.a.useState(4),I=Object(p.a)(P,2),S=I[0],D=I[1];r.a.useEffect(Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E();case 2:"All"==t&&A();case 3:case"end":return e.stop()}}),e)}))),[]);var A=function(){var e=Object(d.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=h+"Category/ReadCategoriesOfPosts.php",e.next=3,fetch(t).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);x(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert(t)}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(d.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=h+"Post/ReadByCategory.php"+("All"==c?"":"?Category="+c),e.next=3,fetch(t).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);y(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Database connection error...")}));case 3:0==g.length&&k(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){D((function(e){return e+4}))};return Object(f.jsxs)("div",{className:"blogScreen",children:[Object(f.jsx)(b,{}),Object(f.jsxs)("div",{children:[function(){if("All"==t)return Object(f.jsx)("div",{className:"displayCategories",children:Object(f.jsxs)("select",{id:"selectedCategory",onChange:function(){!function(){var e=document.getElementById("selectedCategory"),t=e.options[e.selectedIndex].value;s(t)}()},children:[Object(f.jsx)("option",{value:"All",children:"All"}),m.map((function(e){return Object(f.jsx)("option",{value:e.NameOfCategory,children:e.NameOfCategory})}))]})})}(),g.length>0?Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{className:"posts",children:[g.slice(0,S).map((function(t){if("All"==c||t.Category==c)return Object(f.jsxs)("div",{className:"postGrid",onClick:function(){var n,a;n=t.ID.toString(),a=t.Title,e.push("post/"+n+"/"+a.replace(" ","%20"))},children:[Object(f.jsx)("img",{className:"postGridImage",src:t.CoverPhotoLink}),Object(f.jsxs)("div",{className:"postGridInformation",children:[Object(f.jsx)("h2",{className:"postGridTitle",children:t.Title}),Object(f.jsx)("p",{className:"postGridCategory",children:"Category: "+t.Category}),Object(f.jsx)("p",{className:"postGridDate",children:(n=t.PostDate,new Date(n+" +03:00").toLocaleString("es-ES",{timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,day:"numeric",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1}))})]})]});var n})),void(g.length<=S&&0!=g.length&&(document.getElementById("morePostsButton").style.display="none"))]}),Object(f.jsx)("div",{className:"morePostsButtonArea",children:Object(f.jsx)("button",{className:"morePostsButton",id:"morePostsButton",onClick:T,children:"More"})})]}):N?Object(f.jsx)("div",{children:Object(f.jsx)("h6",{style:{fontSize:"150%",fontWeight:"100"},align:"center",children:"Loading..."})}):Object(f.jsx)("h6",{style:{fontSize:"150%",fontWeight:"100"},align:"center",children:"There are no posts..."})]}),Object(f.jsx)(j,{})]})}var O=n(140),v=n(144),g=n(708),y=n(130),C=n(141),w=n(143),N=n(142),k=(n(280),n(225)),P=n.n(k);function I(){var e=Object(i.f)().pathname.split("/"),t=e[2],n=e[3],a=r.a.useState([]),c=Object(p.a)(a,2),s=c[0],o=c[1],u=r.a.useState(!0),m=Object(p.a)(u,2),x=m[0],k=m[1],I=r.a.useState([]),S=Object(p.a)(I,2),D=S[0],A=S[1],E=r.a.useState("0.0.0.0"),T=Object(p.a)(E,2),B=T[0],U=T[1];r.a.useEffect(Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L();case 2:return e.next=4,F();case 4:return e.next=6,M();case 6:case"end":return e.stop()}}),e)}))),[]);var F=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!x){e.next=3;break}return e.next=3,fetch("https://api.db-ip.com/v2/free/self",{method:"GET"}).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json().then((function(e){U(e.ipAddress)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Fatal error...")}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(h+"Post/ReadConcrete.php?ID="+t.toString()).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);o(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Post content error! Database connection error...")}));case 2:0==s.length&&k(!1);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),M=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(h+"UserComment/ReadForConcretePost.php?PostID="+t.toString()).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);A(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Comments error! Database connection error...")}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),R=function(e){return Object(f.jsx)(g.a,{style:y.a,language:e.className?e.className.substring(9):"",children:e.children?e.children:""})},J=function(e){return new Date(e+" +03:00").toLocaleString("es-ES",{timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,day:"numeric",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1})},z=function(){var e=Object(d.a)(l.a.mark((function e(n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),(a=new FormData).append("Nick",document.getElementById("Nick").value),a.append("Content",document.getElementById("Content").value),a.append("PostID",t),a.append("IP",B),a.append("ClientURL",window.location.href),a.append("CommentDate",(new Date).toLocaleString("es-ES",{timeZone:"Europe/Istanbul"}).replaceAll("/","-")),e.next=10,fetch(h+"UserComment/Create.php",{method:"POST",body:a}).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:""!=t?alert(t):window.scrollTo(0,document.body.scrollHeight);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 10:document.getElementById("Nick").value="",document.getElementById("Content").value="",M();case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(f.jsxs)("div",{className:"postScreen",children:[Object(f.jsx)(b,{}),Object(f.jsx)("div",{children:s&&s.Title===n.replace("%20"," ")?Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"PostArea",children:Object(f.jsx)(O.a,{rehypePlugins:[v.a,C.a,N.a],components:{code:R},remarkPlugins:[w.a],children:"<div className='postInfo'><img className='postImage' src='"+s.CoverPhotoLink+"'/><div className='postHeaderText'><h1 className='postTitle' align='center'>"+s.Title+"</h1><h6 className='postDate' align='center'>"+J(s.PostDate)+"</h6></div></div>"+s.Content,className:P.a.reactMarkDown})}),Object(f.jsx)("div",{children:Object(f.jsxs)("div",{className:"commentsArea",children:[Object(f.jsxs)("form",{onSubmit:function(e){return z(e)},className:"commentsForm",children:[Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{className:"commentInputLabel",children:"Nick"}),Object(f.jsx)("input",{className:"nickInput",name:"Nick",id:"Nick",type:"text",placeholder:"Enter a nick...",autoComplete:"off",required:!0,minLength:3})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{className:"commentInputLabel",children:"Comment"}),Object(f.jsx)("input",{className:"commentInput",name:"Content",id:"Content",type:"text",placeholder:"Enter your comment...",autoComplete:"off",required:!0,minLength:2,maxLength:280})]}),Object(f.jsx)("div",{children:Object(f.jsx)("input",{className:"commentPostButton",name:"Submit",id:"Submit",type:"submit",value:"Post"})})]}),Object(f.jsx)("div",{className:"usersCommentsArea",children:D.map((function(e){return Object(f.jsxs)("div",{className:"userCommentArea",children:[Object(f.jsx)("h4",{className:"userCommentNick",children:e.Nick}),Object(f.jsx)("p",{className:"userCommentContent",children:e.Content}),Object(f.jsx)("p",{className:"userCommentDate",children:J(e.CommentDate)})]})}))})]})})]}):x?Object(f.jsx)("div",{children:Object(f.jsx)("h6",{style:{fontSize:"150%",fontWeight:"100"},align:"center",children:"Loading..."})}):Object(f.jsx)("h6",{style:{fontSize:"150%",fontWeight:"100"},align:"center",children:"POST NOT EXIST..."})}),Object(f.jsx)(j,{})]})}var S=n.p+"static/media/taza.1fa020a4.jpg";n(512);function D(){return Object(f.jsxs)("div",{className:"aboutScreen",children:[Object(f.jsx)(b,{}),Object(f.jsxs)("div",{className:"aboutArea",children:[Object(f.jsx)("img",{className:"aboutPic",src:S}),Object(f.jsx)("br",{}),Object(f.jsxs)("span",{children:["Welcome to my mind! This is my personal space. Here I write any experience, thought or thing that I have just learned.",Object(f.jsx)("br",{}),Object(f.jsx)("br",{}),"I am a Spanish, I was born in 1999 and I study computer engineering at Ege University located in Turkey. I love to learn new things, work hard, play the guitar and socialize with foreigners."]})]}),Object(f.jsx)(j,{})]})}var A=n(185),E=n(148),T=n(91);n(618);function B(e){var t=e.user,n=r.a.useState([]),a=Object(p.a)(n,2),c=a[0],s=a[1],o=r.a.useState([]),i=Object(p.a)(o,2),u=i[0],m=i[1],b=r.a.useState([]),j=Object(p.a)(b,2),x=j[0],k=j[1],P=r.a.useState(""),I=Object(p.a)(P,2),S=I[0],D=I[1];r.a.useEffect(Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A();case 2:return e.next=4,B();case 4:return e.next=6,U();case 6:case"end":return e.stop()}}),e)}))),[]);var A=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h+"/Admin/ReadCategoriesInfo.php",e.next=3,fetch("http://localhost:3000//Admin/ReadCategoriesInfo.php").then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);m(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Database connection error...")}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h+"/Admin/ReadUserCommentsInfo.php",e.next=3,fetch("http://localhost:3000//Admin/ReadUserCommentsInfo.php").then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);s(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Database connection error...")}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),U=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h+"/Admin/ReadPostsInfo.php",e.next=3,fetch("http://localhost:3000//Admin/ReadPostsInfo.php").then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);k(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Database connection error...")}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=function(){var e=Object(d.a)(l.a.mark((function e(n){var a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=n.row)){e.next=5;break}a[n.field]=n.value,e.next=7;break;case 5:return B(),e.abrupt("return");case 7:return(r=new FormData).append("Username",t.Username),r.append("Password",t.Password),r.append("ID",parseInt(a.id)),r.append("Nick",a.UserCommentNick),r.append("Content",a.UserCommentContent),e.next=15,fetch(h+"Admin/UpdateComment.php",{method:"POST","Content-Type":"application/json",body:r}).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e&&alert(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 15:B();case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(){var e=Object(d.a)(l.a.mark((function e(n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).append("Username",t.Username),a.append("Password",t.Password),a.append("ID",n),e.next=6,fetch(h+"Admin/DeleteComment.php",{method:"POST","Content-Type":"application/json",body:a}).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e&&alert(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 6:U(),B();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),M=function(){var e=Object(d.a)(l.a.mark((function e(n){var a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n.row){e.next=4;break}return A(),e.abrupt("return");case 4:return(r=new FormData).append("Username",t.Username),r.append("Password",t.Password),r.append("CurrentNameOfCategory",a.NameOfCategory),r.append("NewNameOfCategory",n.value),e.next=11,fetch(h+"Admin/UpdateCategory.php",{method:"POST","Content-Type":"application/json",body:r}).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e&&alert(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 11:A();case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(d.a)(l.a.mark((function e(n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).append("Username",t.Username),a.append("Password",t.Password),a.append("NameOfCategory",n),e.next=6,fetch(h+"Admin/DeleteCategory.php",{method:"POST","Content-Type":"application/json",body:a}).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e&&alert(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 6:U(),A();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),J=function(){var e=Object(d.a)(l.a.mark((function e(n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).append("Username",t.Username),a.append("Password",t.Password),a.append("NameOfCategory",n),e.next=6,fetch(h+"Admin/PostCategory.php",{method:"POST","Content-Type":"application/json",body:a}).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e?alert(e):document.getElementById("NewCategory").value=""}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 6:A();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),z=function(){var e=Object(d.a)(l.a.mark((function e(n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).append("Username",t.Username),a.append("Password",t.Password),a.append("ID",n),e.next=6,fetch(h+"Admin/DeletePost.php",{method:"POST","Content-Type":"application/json",body:a}).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e&&alert(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 6:A(),U();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),G=function(e){document.getElementById("PostID").value=e},_=function(e){return Object(f.jsx)(g.a,{style:y.a,language:e.className?e.className.substring(9):"",children:e.children?e.children:""})},W=function(){var e=Object(d.a)(l.a.mark((function e(){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(document.getElementById("PostID")){e.next=2;break}return e.abrupt("return");case 2:return(n=new FormData).append("Username",t.Username),n.append("Password",t.Password),n.append("ID",parseInt(document.getElementById("PostID").value)),n.append("Title",document.getElementById("PostTitle").value.replaceAll('"',"'")),n.append("Content",document.getElementById("PostContent").value.replaceAll('"',"'").replaceAll("\\","\\\\")),n.append("Category",document.getElementById("PostCategory").value),n.append("PostDate",document.getElementById("PostDate").value.replace("T"," ").replaceAll("-",".")),n.append("CoverPhotoLink",document.getElementById("PostCoverLink").value),n.append("isNew",x.length==document.getElementById("PostID").value&&"Private"!=document.getElementById("PostCategory").value?"1":"0"),e.next=14,fetch(h+"Admin/PostOrUpdatePost.php",{method:"POST","Content-Type":"application/json",body:n}).then(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e?alert(e):(document.getElementById("PostID").value="",document.getElementById("PostTitle").value="",document.getElementById("PostContent").value="",document.getElementById("PostCoverLink").value="",D(""))}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 14:A(),U();case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Z=function(){return Object(f.jsxs)("div",{className:"markdownEditor",children:[Object(f.jsx)("label",{children:"ID: "}),Object(f.jsx)("input",{className:"IDLabel",type:"number",id:"PostID",disabled:!0}),Object(f.jsx)("button",{onClick:function(){return G(x.length)},children:"Set For New Post"}),Object(f.jsx)("div",{className:"break"}),Object(f.jsx)("label",{children:"Title: "}),Object(f.jsx)("input",{type:"text",id:"PostTitle"}),Object(f.jsx)("div",{className:"break"}),Object(f.jsx)("label",{children:"Date: "}),Object(f.jsx)("input",{type:"datetime-local",id:"PostDate"}),Object(f.jsx)("div",{className:"break"}),Object(f.jsx)("label",{children:"Category: "}),Object(f.jsx)("select",{id:"PostCategory",children:u.map((function(e){return Object(f.jsx)("option",{value:e.NameOfCategory,children:e.NameOfCategory})}))}),Object(f.jsx)("div",{className:"break"}),Object(f.jsx)("label",{children:"Cover Link: "}),Object(f.jsx)("input",{type:"text",id:"PostCoverLink"}),Object(f.jsx)("div",{className:"break"}),Object(f.jsx)("textarea",{className:"textArea",id:"PostContent",onKeyDown:function(e){if(9==e.keyCode){e.preventDefault();var t=document.getElementById("PostContent"),n=t.selectionStart,a=t.selectionEnd;t.value=t.value.substring(0,n)+"\t"+t.value.substring(a),t.selectionStart=t.selectionEnd=n+1}}}),Object(f.jsx)(O.a,{rehypePlugins:[v.a,C.a,N.a],components:{code:_},remarkPlugins:[w.a],children:S,className:"markdown"}),Object(f.jsx)("div",{className:"break"}),Object(f.jsx)(T.a,{style:{backgroundColor:"#000000",width:"6%",padding:"3px 35px",marginTop:"7px",marginRight:"7px"},onClick:function(){D(document.getElementById("PostContent").value)},variant:"contained",type:"submit",children:"Review"}),Object(f.jsx)(T.a,{style:{backgroundColor:"#0c7d06",width:"6%",padding:"3px 35px",marginTop:"7px"},onClick:function(){return W()},variant:"contained",type:"submit",children:"Post"})]})};return Object(f.jsxs)("div",{className:"adminScreen",children:[Object(f.jsx)("div",{style:{height:320,width:"100%",marginBottom:"40px"},children:Object(f.jsx)(E.a,{columns:[{field:"PostTitle",headerName:"Title of Post",sortable:!1,disableColumnMenu:!0,flex:1},{field:"UserCommentNick",headerName:"Nick of User",sortable:!1,disableColumnMenu:!0,editable:!0,flex:1},{field:"UserCommentContent",headerName:"Content of Comment",sortable:!1,disableColumnMenu:!0,editable:!0,flex:1},{field:"UserCountry",headerName:"Country",sortable:!1,disableColumnMenu:!0,flex:1},{field:"CommentDate",headerName:"Date",sortable:!1,disableColumnMenu:!0,flex:1},{field:"action",headerName:"Action",sortable:!1,disableColumnMenu:!0,flex:1,renderCell:function(e){return Object(f.jsx)(T.a,{style:{backgroundColor:"#e8605d",padding:"3px 35px",width:"100%"},onClick:function(){return L(e.id)},variant:"contained",type:"submit",children:"Delete"})}}],rows:c,pageSize:4,onCellEditCommit:F})}),Object(f.jsxs)("div",{style:{height:320,width:"100%",marginBottom:"80px"},children:[Object(f.jsx)(E.a,{columns:[{field:"NameOfCategory",headerName:"Name",sortable:!1,disableColumnMenu:!0,editable:!0,flex:1},{field:"NumberOfPosts",headerName:"Number of Posts",sortable:!1,disableColumnMenu:!0,flex:1},{field:"action",headerName:"Action",sortable:!1,disableColumnMenu:!0,flex:1,renderCell:function(e){return Object(f.jsx)(T.a,{style:{backgroundColor:"#e8605d",padding:"3px 35px",width:"100%"},onClick:function(){return R(e.id)},variant:"contained",type:"submit",children:"Delete"})}}],rows:u,pageSize:4,onCellEditCommit:M}),Object(f.jsx)("label",{children:"New: "}),Object(f.jsx)("input",{type:"text",id:"NewCategory"}),Object(f.jsx)(T.a,{style:{backgroundColor:"#0c7d06",width:"1%",height:"25px",padding:"3px 35px",marginTop:"2px"},onClick:function(){return J(document.getElementById("NewCategory").value)},variant:"contained",type:"submit",children:"POST"})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{style:{height:320,width:"100%",marginBottom:"20px"},children:Object(f.jsx)(E.a,{columns:[{field:"PostTitle",headerName:"Title",sortable:!1,disableColumnMenu:!0,flex:1},{field:"PostCategory",headerName:"Category",sortable:!1,disableColumnMenu:!0,flex:1},{field:"PostDate",headerName:"Date",sortable:!1,disableColumnMenu:!0,flex:1},{field:"NumberOfComments",headerName:"Number of Comments",sortable:!1,disableColumnMenu:!0,flex:1},{field:"action",headerName:"Action",sortable:!1,disableColumnMenu:!0,flex:1,renderCell:function(e){return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(T.a,{style:{backgroundColor:"#ffcc00",width:"48%",marginRight:"4%",padding:"3px 35px"},onClick:function(){return t=e.row,G(t.id),document.getElementById("PostTitle").value=t.PostTitle,document.getElementById("PostContent").value=t.PostContent,D(t.PostContent),document.getElementById("PostDate").value=t.PostDate.replace(" ","T"),document.getElementById("PostCategory").value=t.PostCategory,void(document.getElementById("PostCoverLink").value=t.PostCoverPhotoLink);var t},variant:"contained",type:"submit",children:"Edit"}),Object(f.jsx)(T.a,{style:{backgroundColor:"#e8605d",width:"48%",padding:"3px 35px"},onClick:function(){return z(e.id)},variant:"contained",type:"submit",children:"Delete"})]})}}],rows:x,pageSize:4})}),Z()]})]})}n(622);function U(){var e=r.a.useState([]),t=Object(p.a)(e,2),n=t[0],a=t[1],c=r.a.useState([]),s=Object(p.a)(c,2),o=s[0],i=s[1],u=r.a.useState([]),l=Object(p.a)(u,2),d=l[0],m=l[1],b=r.a.useState([]),j=Object(p.a)(b,2),x=j[0],O=j[1],v=r.a.useState({}),g=Object(p.a)(v,2),y=g[0],C=g[1],w=r.a.useState(!1),N=Object(p.a)(w,2),k=N[0],P=N[1];r.a.useEffect((function(){I(),S()}),[]);var I=function(){var e=[],t=[];fetch("http://localhost:3000/UserComment/ReadCountOfCommentsByCountries.php").then((function(n){n.text().then((function(n){JSON.parse(n).map((function(n){e.push(n.Country),t.push(n.CommentsCount)})),a(e),i(t)}))})).catch((function(e){return alert("Database connection error...")}))};var S=function(){var e=[],t=[];fetch("http://localhost:3000/UserComment/ReadCountOfCommentsByMonths.php").then((function(n){n.text().then((function(n){JSON.parse(n).map((function(n){e.push(function(e){switch(e){case"1":return"January";case"2":return"Frebruary";case"3":return"March";case"4":return"April";case"5":return"May";case"6":return"June";case"7":return"July";case"8":return"August";case"9":return"September";case"10":return"October";case"11":return"November";default:return"December"}}(n.CommentsMonth)),t.push(n.CommentsCount)})),m(e),O(t)}))})).catch((function(e){return alert("Database connection error...")}))};return 0==k?Object(f.jsxs)("div",{className:"loginScreen",children:[Object(f.jsxs)("form",{className:"loginForm",onSubmit:function(e){return function(e){e.preventDefault();var t=new FormData;t.append("Username",document.getElementById("Username").value),t.append("Password",document.getElementById("Password").value),fetch(h+"Admin/ReadUserExist.php",{method:"POST","Content-Type":"application/json",body:t}).then((function(e){e.text().then((function(e){""!=e?alert(e):(C({Username:document.getElementById("Username").value,Password:document.getElementById("Password").value}),P(!0))}))}))}(e)},children:[Object(f.jsx)("h1",{children:"Admin Panel"}),Object(f.jsx)("input",{className:"usernameInput",name:"Username",id:"Username",type:"password",placeholder:"Username",autocomplete:"off"}),Object(f.jsx)("input",{className:"passwordInput",name:"Password",id:"Password",type:"password",placeholder:"Password",autocomplete:"off"}),Object(f.jsx)("input",{className:"loginPostButton",name:"loginSubmit",id:"loginSubmit",type:"submit",value:"Login"})]}),Object(f.jsx)("h1",{align:"center",children:"Statistics"}),Object(f.jsx)("div",{className:"chartArea",children:Object(f.jsx)(A.b,{data:{labels:n,datasets:[{backgroundColor:function(e){for(var t=["red","blue","yellow","orange","brown","pink"],n=0;t.length<e;)t.push(t[n++%t.length]);return t}(o.length),data:o}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},title:{text:"Countries of Comments",display:!0}}},height:290})}),Object(f.jsx)("div",{className:"chartArea",children:Object(f.jsx)(A.a,{data:{labels:d,datasets:[{backgroundColor:"rgba(75,192,192,0.2)",data:x}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},title:{text:"Months of Comments Counts",display:!0}}},height:290})})]}):Object(f.jsx)(B,{user:y})}n(623);var F=function(){return Object(f.jsxs)(o.a,{children:[Object(f.jsx)(i.a,{exact:!0,path:"/",component:x}),Object(f.jsx)(i.a,{exact:!0,path:"/projects",component:x}),Object(f.jsx)(i.a,{exact:!0,path:"/about",component:D}),Object(f.jsx)(i.a,{path:"/post/:id/:title",component:I}),Object(f.jsx)(i.a,{exact:!0,path:"/admin",component:U})]})};s.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(F,{})}),document.getElementById("root"))}},[[624,1,2]]]);
//# sourceMappingURL=main.5cac221a.chunk.js.map