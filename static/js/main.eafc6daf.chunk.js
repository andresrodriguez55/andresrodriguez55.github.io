(this["webpackJsonppersonal-web"]=this["webpackJsonppersonal-web"]||[]).push([[0],{218:function(e,t,n){e.exports={reactMarkDown:"markdown-styles_reactMarkDown__sUiWG"}},226:function(e,t,n){e.exports={reactMarkDown:"markdown-styles_reactMarkDown__3ULgc"}},264:function(e,t,n){},270:function(e,t,n){},271:function(e,t,n){},273:function(e,t,n){},505:function(e,t,n){},611:function(e,t,n){},615:function(e,t,n){},616:function(e,t,n){},617:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(75),s=n.n(c),o=n(104),i=n(30),u=n(8),l=(n(264),n.p+"static/media/personAndGuitar.24374079.jpg"),d=n(2);function p(){var e=Object(i.e)();function t(t){switch(t){case"blog":e.push("");break;case"projects":e.push("/projects");break;case"about":e.push("/about");break;default:e.push("/admin")}}return Object(d.jsxs)("div",{children:[Object(d.jsxs)("div",{className:"headerArea",children:[Object(d.jsx)("div",{className:"headerTitleArea",children:Object(d.jsx)("span",{className:"title",children:"Andres \nArturo \nRodriguez \nCalderon"})}),Object(d.jsx)("div",{className:"verticalLine"}),Object(d.jsx)("img",{className:"headerImage",src:l}),Object(d.jsxs)("ul",{className:"listHeaderCategories",children:[Object(d.jsx)("li",{children:Object(d.jsx)("div",{className:"headerCategoryArea",children:Object(d.jsx)("span",{className:"headerCategoryFont",onClick:function(){t("blog")},children:"Blog"})})}),Object(d.jsx)("li",{children:Object(d.jsx)("div",{className:"headerCategoryArea",children:Object(d.jsx)("span",{className:"headerCategoryFont",onClick:function(){t("projects")},children:"Projects"})})}),Object(d.jsx)("li",{children:Object(d.jsx)("div",{className:"headerCategoryArea",children:Object(d.jsx)("span",{className:"headerCategoryFont",onClick:function(){t("about")},children:"About"})})}),Object(d.jsx)("li",{children:Object(d.jsx)("div",{className:"headerCategoryArea",children:Object(d.jsx)("span",{className:"headerCategoryFont",onClick:function(){t("admin")},children:"Admin"})})})]})]}),Object(d.jsx)("div",{className:"horizontalLine"})]})}n(270);var m=function(){return Object(d.jsx)("div",{children:Object(d.jsx)("div",{className:"footer",children:Object(d.jsxs)("div",{className:"footerSocialIconsArea",children:[Object(d.jsx)("a",{href:"https://github.com/andresrodriguez55",target:"_blank",children:Object(d.jsx)("i",{className:"fab fa-github"})}),Object(d.jsx)("a",{href:"https://www.linkedin.com/in/andr%C3%A9s-arturo-rodr%C3%ADguez-calder%C3%B3n-623873197/",target:"_blank",children:Object(d.jsx)("i",{className:"fab fa-linkedin"})}),Object(d.jsx)("a",{href:"mailto:andrescalderonn1995@gmail.com",target:"_blank",children:Object(d.jsx)("i",{className:"fas fa-envelope"})}),Object(d.jsx)("a",{href:"https://www.hackerrank.com/andrescalderon55",target:"_blank",children:Object(d.jsx)("i",{className:"fab fa-hackerrank"})}),Object(d.jsx)("a",{href:"https://www.mathworks.com/matlabcentral/cody/players/23052170",target:"_blank",children:Object(d.jsx)("i",{className:"fa fa-square-root-alt"})}),Object(d.jsx)("a",{href:"https://www.kaggle.com/andrescalderon55",target:"_blank",children:Object(d.jsx)("i",{className:"fab fa-kaggle"})})]})})})},h=(n(271),"https://personalblog55.herokuapp.com/");function f(){var e=Object(i.e)();var t="/"==Object(i.f)().pathname?"All":"Projects",n=r.a.useState(t),a=Object(u.a)(n,2),c=a[0],s=a[1],o=r.a.useState([]),l=Object(u.a)(o,2),f=l[0],b=l[1],j=r.a.useState([]),x=Object(u.a)(j,2),O=x[0],v=x[1],g=r.a.useState(4),y=Object(u.a)(g,2),C=y[0],w=y[1];r.a.useEffect((function(){k(),"All"==t&&N()}),[]);var N=function(){var e=h+"Category/ReadCategoriesOfPosts.php";fetch(e).then((function(e){e.text().then((function(e){var t=JSON.parse(e);b(t)}))})).catch((function(t){return alert(e)}))},k=function(){fetch(h+"Post/ReadByCategory.php"+("All"==c?"":"?Category="+c)).then((function(e){e.text().then((function(e){var t=JSON.parse(e);v(t)}))})).catch((function(e){return alert("Database connection error...")}))},P=function(){w((function(e){return e+4}))};Intl.DateTimeFormat().resolvedOptions().timeZone;return Object(d.jsxs)("div",{className:"blogScreen",children:[Object(d.jsx)(p,{}),Object(d.jsxs)("div",{children:[function(){if("All"==t)return Object(d.jsx)("div",{class:"displayCategories",children:Object(d.jsxs)("select",{id:"selectedCategory",onChange:function(){!function(){var e=document.getElementById("selectedCategory"),t=e.options[e.selectedIndex].value;s(t)}()},children:[Object(d.jsx)("option",{value:"All",children:"All"}),f.map((function(e){return Object(d.jsx)("option",{value:e.NameOfCategory,children:e.NameOfCategory})}))]})})}(),Object(d.jsxs)("div",{children:[Object(d.jsxs)("div",{className:"posts",children:[O.slice(0,C).map((function(t){if("All"==c||t.Category==c)return Object(d.jsxs)("div",{className:"postGrid",onClick:function(){var n,a;n=t.ID.toString(),a=t.Title,e.push("post/"+n+"/"+a.replace(" ","%20"))},children:[Object(d.jsx)("img",{className:"postGridImage",src:t.CoverPhotoLink}),Object(d.jsxs)("div",{className:"postGridInformation",children:[Object(d.jsx)("h2",{className:"postGridTitle",children:t.Title}),Object(d.jsx)("p",{className:"postGridCategory",children:"Category: "+t.Category}),Object(d.jsx)("p",{className:"postGridDate",children:(n=t.PostDate,new Date(n+" +03:00").toLocaleString("es-ES",{timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,day:"numeric",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1}))})]})]});var n})),void(O.length<=C&&0!=O.length&&(document.getElementById("morePostsButton").style.display="none"))]}),Object(d.jsx)("div",{className:"morePostsButtonArea",children:Object(d.jsx)("button",{className:"morePostsButton",id:"morePostsButton",onClick:P,children:"More"})})]})]}),Object(d.jsx)(m,{})]})}var b=n(17),j=n.n(b),x=n(26),O=n(95),v=n(96),g=n(700),y=n(130),C=n(138),w=(n(273),n(218)),N=n.n(w);function k(){var e=Object(i.f)().pathname.split("/"),t=e[2],n=e[3],a=r.a.useState([]),c=Object(u.a)(a,2),s=c[0],o=c[1],l=r.a.useState(!0),f=Object(u.a)(l,2),b=f[0],w=f[1],k=r.a.useState([]),P=Object(u.a)(k,2),I=P[0],D=P[1],S=r.a.useState("0.0.0.0"),A=Object(u.a)(S,2),E=A[0],T=A[1];r.a.useEffect(Object(x.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U();case 2:return e.next=4,B();case 4:return e.next=6,M();case 6:case"end":return e.stop()}}),e)}))),[]);var B=function(){var e=Object(x.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!b){e.next=3;break}return e.next=3,fetch("https://api.db-ip.com/v2/free/self",{method:"GET"}).then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json().then((function(e){T(e.ipAddress)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Fatal error...")}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),U=function(){var e=Object(x.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(h+"Post/ReadConcrete.php?ID="+t.toString()).then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);o(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Post content error! Database connection error...")}));case 2:0==s.length&&w(!1);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),M=function(){var e=Object(x.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(h+"UserComment/ReadForConcretePost.php?PostID="+t.toString()).then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);D(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Comments error! Database connection error...")}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L=function(e){return Object(d.jsx)(g.a,{style:y.a,language:e.className?e.className.substring(9):"",children:e.children?e.children:""})},F=function(e){return new Date(e+" +03:00").toLocaleString("es-ES",{timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,day:"numeric",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1})},R=function(){var e=Object(x.a)(j.a.mark((function e(n){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),(a=new FormData).append("Nick",document.getElementById("Nick").value),a.append("Content",document.getElementById("Content").value),a.append("PostID",t),a.append("IP",E),a.append("ClientURL",window.location.href),a.append("CommentDate",(new Date).toLocaleString("es-ES",{timeZone:"Europe/Istanbul"}).replaceAll("/","-")),e.next=10,fetch(h+"UserComment/Create.php",{method:"POST",body:a}).then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:""!=t&&alert(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 10:document.getElementById("Nick").value="",document.getElementById("Content").value="",M();case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{className:"postScreen",children:[Object(d.jsx)(p,{}),Object(d.jsx)("div",{children:s&&s.Title===n.replace("%20"," ")?Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:"PostArea",children:Object(d.jsx)(O.a,{rehypePlugins:[v.a,C.a],components:{code:L},children:"<div className='postInfo'><img className='postImage' src='"+s.CoverPhotoLink+"'/><div className='postHeaderText'><h1 className='postTitle' align='center'>"+s.Title+"</h1><h6 className='postDate' align='center'>"+F(s.PostDate)+"</h6></div></div>"+s.Content,className:N.a.reactMarkDown})}),Object(d.jsx)("div",{children:Object(d.jsxs)("div",{className:"commentsArea",children:[Object(d.jsxs)("form",{onSubmit:function(e){return R(e)},class:"commentsForm",children:[Object(d.jsxs)("div",{children:[Object(d.jsx)("label",{className:"commentInputLabel",children:"Nick"}),Object(d.jsx)("input",{className:"nickInput",name:"Nick",id:"Nick",type:"text",placeholder:"Enter a nick...",autocomplete:"off",required:!0,minLength:3})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("label",{className:"commentInputLabel",children:"Comment"}),Object(d.jsx)("input",{className:"commentInput",name:"Content",id:"Content",type:"text",placeholder:"Enter your comment...",autocomplete:"off",required:!0,minLength:2,maxLength:280})]}),Object(d.jsx)("div",{children:Object(d.jsx)("input",{className:"commentPostButton",name:"Submit",id:"Submit",type:"submit",value:"Post"})})]}),Object(d.jsx)("div",{className:"usersCommentsArea",children:I.map((function(e){return Object(d.jsxs)("div",{className:"userCommentArea",children:[Object(d.jsx)("h4",{className:"userCommentNick",children:e.Nick}),Object(d.jsx)("p",{className:"userCommentContent",children:e.Content}),Object(d.jsx)("p",{className:"userCommentDate",children:F(e.CommentDate)})]})}))})]})})]}):b?Object(d.jsx)("div",{children:Object(d.jsx)("h6",{style:{fontSize:"150%",fontWeight:"100"},align:"center",children:"Loading..."})}):Object(d.jsx)("h6",{style:{fontSize:"150%",fontWeight:"100"},align:"center",children:"POST NOT EXIST..."})}),Object(d.jsx)(m,{})]})}var P=n.p+"static/media/ContentAbout.760ebdfa.md",I=n(226),D=n.n(I);n(505);function S(){var e=Object(a.useState)(""),t=Object(u.a)(e,2),n=t[0],r=t[1];return fetch(P).then((function(e){return e.text()})).then((function(e){return r(e)})),Object(d.jsxs)("div",{className:"aboutScreen",children:[Object(d.jsx)(p,{}),Object(d.jsx)(O.a,{children:n,rehypePlugins:[v.a],className:D.a.reactMarkDown}),Object(d.jsx)(m,{})]})}var A=n(178),E=n(142),T=n(88);n(611);function B(e){var t=e.user,n=r.a.useState([]),a=Object(u.a)(n,2),c=a[0],s=a[1],o=r.a.useState([]),i=Object(u.a)(o,2),l=i[0],p=i[1],m=r.a.useState([]),f=Object(u.a)(m,2),b=f[0],w=f[1],N=r.a.useState(""),k=Object(u.a)(N,2),P=k[0],I=k[1];r.a.useEffect(Object(x.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D();case 2:return e.next=4,S();case 4:return e.next=6,A();case 6:case"end":return e.stop()}}),e)}))),[]);var D=function(){var e=Object(x.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h+"/Admin/ReadCategoriesInfo.php",e.next=3,fetch("https://personalblog55.herokuapp.com//Admin/ReadCategoriesInfo.php").then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);p(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Database connection error...")}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=Object(x.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h+"/Admin/ReadUserCommentsInfo.php",e.next=3,fetch("https://personalblog55.herokuapp.com//Admin/ReadUserCommentsInfo.php").then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);s(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Database connection error...")}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(){var e=Object(x.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h+"/Admin/ReadPostsInfo.php",e.next=3,fetch("https://personalblog55.herokuapp.com//Admin/ReadPostsInfo.php").then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);w(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Database connection error...")}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=function(){var e=Object(x.a)(j.a.mark((function e(n){var a,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=n.row)){e.next=5;break}a[n.field]=n.value,e.next=7;break;case 5:return S(),e.abrupt("return");case 7:return(r=new FormData).append("Username",t.Username),r.append("Password",t.Password),r.append("ID",parseInt(a.id)),r.append("Nick",a.UserCommentNick),r.append("Content",a.UserCommentContent),e.next=15,fetch(h+"Admin/UpdateComment.php",{method:"POST","Content-Type":"application/json",body:r}).then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e&&alert(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 15:S();case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),U=function(){var e=Object(x.a)(j.a.mark((function e(n){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).append("Username",t.Username),a.append("Password",t.Password),a.append("ID",n),e.next=6,fetch(h+"Admin/DeleteComment.php",{method:"POST","Content-Type":"application/json",body:a}).then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e&&alert(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 6:A(),S();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),M=function(){var e=Object(x.a)(j.a.mark((function e(n){var a,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n.row){e.next=4;break}return D(),e.abrupt("return");case 4:return(r=new FormData).append("Username",t.Username),r.append("Password",t.Password),r.append("CurrentNameOfCategory",a.NameOfCategory),r.append("NewNameOfCategory",n.value),e.next=11,fetch(h+"Admin/UpdateCategory.php",{method:"POST","Content-Type":"application/json",body:r}).then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e&&alert(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 11:D();case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(){var e=Object(x.a)(j.a.mark((function e(n){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).append("Username",t.Username),a.append("Password",t.Password),a.append("NameOfCategory",n),e.next=6,fetch(h+"Admin/DeleteCategory.php",{method:"POST","Content-Type":"application/json",body:a}).then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e&&alert(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 6:A(),D();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=function(){var e=Object(x.a)(j.a.mark((function e(n){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).append("Username",t.Username),a.append("Password",t.Password),a.append("NameOfCategory",n),e.next=6,fetch(h+"Admin/PostCategory.php",{method:"POST","Content-Type":"application/json",body:a}).then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e?alert(e):document.getElementById("NewCategory").value=""}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 6:D();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(x.a)(j.a.mark((function e(n){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).append("Username",t.Username),a.append("Password",t.Password),a.append("ID",n),e.next=6,fetch(h+"Admin/DeletePost.php",{method:"POST","Content-Type":"application/json",body:a}).then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e&&alert(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 6:D(),A();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),J=function(e){document.getElementById("PostID").value=e},_=function(e){return Object(d.jsx)(g.a,{style:y.a,language:e.className?e.className.substring(9):"",children:e.children?e.children:""})},z=function(){var e=Object(x.a)(j.a.mark((function e(){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(document.getElementById("PostID")){e.next=2;break}return e.abrupt("return");case 2:return(n=new FormData).append("Username",t.Username),n.append("Password",t.Password),n.append("ID",parseInt(document.getElementById("PostID").value)),n.append("Title",document.getElementById("PostTitle").value.replaceAll('"',"'")),n.append("Content",document.getElementById("PostContent").value.replaceAll('"',"'")),n.append("Category",document.getElementById("PostCategory").value),n.append("PostDate",document.getElementById("PostDate").value.replace("T"," ").replaceAll("-",".")),n.append("CoverPhotoLink",document.getElementById("PostCoverLink").value),e.next=13,fetch(h+"Admin/PostOrUpdatePost.php",{method:"POST","Content-Type":"application/json",body:n}).then(function(){var e=Object(x.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){""!=e?alert(e):(document.getElementById("PostID").value="",document.getElementById("PostTitle").value="",document.getElementById("PostContent").value="",document.getElementById("PostCoverLink").value="",I(""))}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 13:D(),A();case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G=function(){return Object(d.jsxs)("div",{className:"markdownEditor",children:[Object(d.jsx)("label",{children:"ID: "}),Object(d.jsx)("input",{className:"IDLabel",type:"number",id:"PostID",disabled:!0}),Object(d.jsx)("button",{onClick:function(){return J(b.length)},children:"Set For New Post"}),Object(d.jsx)("div",{className:"break"}),Object(d.jsx)("label",{children:"Title: "}),Object(d.jsx)("input",{type:"text",id:"PostTitle"}),Object(d.jsx)("div",{className:"break"}),Object(d.jsx)("label",{children:"Date: "}),Object(d.jsx)("input",{type:"datetime-local",id:"PostDate"}),Object(d.jsx)("div",{className:"break"}),Object(d.jsx)("label",{children:"Category: "}),Object(d.jsx)("select",{id:"PostCategory",children:l.map((function(e){return Object(d.jsx)("option",{value:e.NameOfCategory,children:e.NameOfCategory})}))}),Object(d.jsx)("div",{className:"break"}),Object(d.jsx)("label",{children:"Cover Link: "}),Object(d.jsx)("input",{type:"text",id:"PostCoverLink"}),Object(d.jsx)("div",{className:"break"}),Object(d.jsx)("textarea",{className:"textArea",id:"PostContent",onKeyDown:function(e){if(9==e.keyCode){e.preventDefault();var t=document.getElementById("PostContent"),n=t.selectionStart,a=t.selectionEnd;t.value=t.value.substring(0,n)+"\t"+t.value.substring(a),t.selectionStart=t.selectionEnd=n+1}}}),Object(d.jsx)(O.a,{rehypePlugins:[v.a,C.a],components:{code:_},children:P,className:"markdown"}),Object(d.jsx)("div",{className:"break"}),Object(d.jsx)(T.a,{style:{backgroundColor:"#000000",width:"6%",padding:"3px 35px",marginTop:"7px",marginRight:"7px"},onClick:function(){I(document.getElementById("PostContent").value)},variant:"contained",type:"submit",children:"Review"}),Object(d.jsx)(T.a,{style:{backgroundColor:"#0c7d06",width:"6%",padding:"3px 35px",marginTop:"7px"},onClick:function(){return z()},variant:"contained",type:"submit",children:"Post"})]})};return Object(d.jsxs)("div",{className:"adminScreen",children:[Object(d.jsx)("div",{style:{height:320,width:"100%",marginBottom:"40px"},children:Object(d.jsx)(E.a,{columns:[{field:"PostTitle",headerName:"Title of Post",sortable:!1,disableColumnMenu:!0,flex:1},{field:"UserCommentNick",headerName:"Nick of User",sortable:!1,disableColumnMenu:!0,editable:!0,flex:1},{field:"UserCommentContent",headerName:"Content of Comment",sortable:!1,disableColumnMenu:!0,editable:!0,flex:1},{field:"UserCountry",headerName:"Country",sortable:!1,disableColumnMenu:!0,flex:1},{field:"CommentDate",headerName:"Date",sortable:!1,disableColumnMenu:!0,flex:1},{field:"action",headerName:"Action",sortable:!1,disableColumnMenu:!0,flex:1,renderCell:function(e){return Object(d.jsx)(T.a,{style:{backgroundColor:"#e8605d",padding:"3px 35px",width:"100%"},onClick:function(){return U(e.id)},variant:"contained",type:"submit",children:"Delete"})}}],rows:c,pageSize:4,onCellEditCommit:B})}),Object(d.jsxs)("div",{style:{height:320,width:"100%",marginBottom:"80px"},children:[Object(d.jsx)(E.a,{columns:[{field:"NameOfCategory",headerName:"Name",sortable:!1,disableColumnMenu:!0,editable:!0,flex:1},{field:"NumberOfPosts",headerName:"Number of Posts",sortable:!1,disableColumnMenu:!0,flex:1},{field:"action",headerName:"Action",sortable:!1,disableColumnMenu:!0,flex:1,renderCell:function(e){return Object(d.jsx)(T.a,{style:{backgroundColor:"#e8605d",padding:"3px 35px",width:"100%"},onClick:function(){return L(e.id)},variant:"contained",type:"submit",children:"Delete"})}}],rows:l,pageSize:4,onCellEditCommit:M}),Object(d.jsx)("label",{children:"New: "}),Object(d.jsx)("input",{type:"text",id:"NewCategory"}),Object(d.jsx)(T.a,{style:{backgroundColor:"#0c7d06",width:"1%",height:"25px",padding:"3px 35px",marginTop:"2px"},onClick:function(){return F(document.getElementById("NewCategory").value)},variant:"contained",type:"submit",children:"POST"})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{style:{height:320,width:"100%",marginBottom:"20px"},children:Object(d.jsx)(E.a,{columns:[{field:"PostTitle",headerName:"Title",sortable:!1,disableColumnMenu:!0,flex:1},{field:"PostCategory",headerName:"Category",sortable:!1,disableColumnMenu:!0,flex:1},{field:"PostDate",headerName:"Date",sortable:!1,disableColumnMenu:!0,flex:1},{field:"NumberOfComments",headerName:"Number of Comments",sortable:!1,disableColumnMenu:!0,flex:1},{field:"action",headerName:"Action",sortable:!1,disableColumnMenu:!0,flex:1,renderCell:function(e){return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(T.a,{style:{backgroundColor:"#ffcc00",width:"48%",marginRight:"4%",padding:"3px 35px"},onClick:function(){return t=e.row,J(t.id),document.getElementById("PostTitle").value=t.PostTitle,document.getElementById("PostContent").value=t.PostContent,I(t.PostContent),document.getElementById("PostDate").value=t.PostDate.replace(" ","T"),document.getElementById("PostCategory").value=t.PostCategory,void(document.getElementById("PostCoverLink").value=t.PostCoverPhotoLink);var t},variant:"contained",type:"submit",children:"Edit"}),Object(d.jsx)(T.a,{style:{backgroundColor:"#e8605d",width:"48%",padding:"3px 35px"},onClick:function(){return R(e.id)},variant:"contained",type:"submit",children:"Delete"})]})}}],rows:b,pageSize:4})}),G()]})]})}n(615);function U(){var e=r.a.useState([]),t=Object(u.a)(e,2),n=t[0],a=t[1],c=r.a.useState([]),s=Object(u.a)(c,2),o=s[0],i=s[1],l=r.a.useState([]),p=Object(u.a)(l,2),m=p[0],f=p[1],b=r.a.useState([]),j=Object(u.a)(b,2),x=j[0],O=j[1],v=r.a.useState({}),g=Object(u.a)(v,2),y=g[0],C=g[1],w=r.a.useState(!1),N=Object(u.a)(w,2),k=N[0],P=N[1];r.a.useEffect((function(){I(),D()}),[]);var I=function(){var e=[],t=[];fetch("https://personalblog55.herokuapp.com/UserComment/ReadCountOfCommentsByCountries.php").then((function(n){n.text().then((function(n){JSON.parse(n).map((function(n){e.push(n.Country),t.push(n.CommentsCount)})),a(e),i(t)}))})).catch((function(e){return alert("Database connection error...")}))};var D=function(){var e=[],t=[];fetch("https://personalblog55.herokuapp.com/UserComment/ReadCountOfCommentsByMonths.php").then((function(n){n.text().then((function(n){JSON.parse(n).map((function(n){e.push(function(e){switch(e){case"1":return"January";case"2":return"Frebruary";case"3":return"March";case"4":return"April";case"5":return"May";case"6":return"June";case"7":return"July";case"8":return"August";case"9":return"September";case"10":return"October";case"11":return"November";default:return"December"}}(n.CommentsMonth)),t.push(n.CommentsCount)})),f(e),O(t)}))})).catch((function(e){return alert("Database connection error...")}))};return 0==k?Object(d.jsxs)("div",{className:"loginScreen",children:[Object(d.jsxs)("form",{className:"loginForm",onSubmit:function(e){return function(e){e.preventDefault();var t=new FormData;t.append("Username",document.getElementById("Username").value),t.append("Password",document.getElementById("Password").value),fetch(h+"Admin/ReadUserExist.php",{method:"POST","Content-Type":"application/json",body:t}).then((function(e){e.text().then((function(e){""!=e?alert(e):(C({Username:document.getElementById("Username").value,Password:document.getElementById("Password").value}),P(!0))}))}))}(e)},children:[Object(d.jsx)("h1",{children:"Admin Panel"}),Object(d.jsx)("input",{className:"usernameInput",name:"Username",id:"Username",type:"password",placeholder:"Username",autocomplete:"off"}),Object(d.jsx)("input",{className:"passwordInput",name:"Password",id:"Password",type:"password",placeholder:"Password",autocomplete:"off"}),Object(d.jsx)("input",{className:"loginPostButton",name:"loginSubmit",id:"loginSubmit",type:"submit",value:"Login"})]}),Object(d.jsx)("h1",{align:"center",children:"Statistics"}),Object(d.jsx)("div",{className:"chartArea",children:Object(d.jsx)(A.b,{data:{labels:n,datasets:[{backgroundColor:function(e){for(var t=["red","blue","yellow","orange","brown","pink"],n=0;t.length<e;)t.push(t[n++%t.length]);return t}(o.length),data:o}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},title:{text:"Countries of Comments",display:!0}}},height:290})}),Object(d.jsx)("div",{className:"chartArea",children:Object(d.jsx)(A.a,{data:{labels:m,datasets:[{backgroundColor:"rgba(75,192,192,0.2)",data:x}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},title:{text:"Months of Comments Counts",display:!0}}},height:290})})]}):Object(d.jsx)(B,{user:y})}n(616);var M=function(){return Object(d.jsxs)(o.a,{basename:"/",children:[Object(d.jsx)(i.a,{exact:!0,path:"/",component:f}),Object(d.jsx)(i.a,{exact:!0,path:"/projects",component:f}),Object(d.jsx)(i.a,{exact:!0,path:"/about",component:S}),Object(d.jsx)(i.a,{path:"/post/:id/:title",component:k}),Object(d.jsx)(i.a,{exact:!0,path:"/admin",component:U})]})};s.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(M,{})}),document.getElementById("root"))}},[[617,1,2]]]);
//# sourceMappingURL=main.eafc6daf.chunk.js.map