(this["webpackJsonppersonal-web"]=this["webpackJsonppersonal-web"]||[]).push([[0],{105:function(e,t,n){},106:function(e,t,n){},107:function(e,t,n){},339:function(e,t,n){},340:function(e,t,n){"use strict";n.r(t);var c=n(3),a=n.n(c),r=n(75),s=n.n(r),i=n(40),o=n(10),l=n(14),j=n.n(l),u=n(29),d=n(22),h=Object(c.createContext)(null),m=(n(98),n(2));function b(){var e=Object(o.e)();function t(t){switch(t){case"blog":e.push("");break;case"projects":e.push("/projects");break;case"about":e.push("/about")}}return Object(m.jsxs)("div",{children:[Object(m.jsxs)("div",{className:"headerArea",children:[Object(m.jsx)("div",{className:"headerTitleArea",children:Object(m.jsx)("h1",{className:"title",children:"Andres \nArturo \nRodriguez \nCalderon"})}),Object(m.jsx)("div",{className:"verticalLine"}),Object(m.jsx)("div",{className:"headerCategoriesArea",children:Object(m.jsxs)("ul",{className:"listHeaderCategories",children:[Object(m.jsx)("li",{children:Object(m.jsx)("div",{className:"headerCategoryArea",children:Object(m.jsx)("p",{className:"headerCategoryFont",onClick:function(){t("blog")},children:"Blog"})})}),Object(m.jsxs)("li",{children:[Object(m.jsx)("div",{className:"headerCategoryArea",children:Object(m.jsx)("p",{className:"headerCategoryFont",onClick:function(){t("projects")},children:"Projects"})}),Object(m.jsx)("div",{className:"headerCategoryArea",children:Object(m.jsx)("p",{className:"headerCategoryFont",onClick:function(){t("about")},children:"About"})})]})]})})]}),Object(m.jsx)("div",{className:"horizontalLine"})]})}n(105);var p=function(){return Object(m.jsx)("div",{children:Object(m.jsxs)("div",{className:"footer",children:[Object(m.jsxs)("div",{className:"footerSocialIconsArea",children:[Object(m.jsx)("a",{href:"https://github.com/andresrodriguez55",target:"_blank",children:Object(m.jsx)("i",{className:"fa fa-github"})}),Object(m.jsx)("a",{href:"https://www.linkedin.com/in/andr%C3%A9s-arturo-rodr%C3%ADguez-calder%C3%B3n-623873197/",target:"_blank",children:Object(m.jsx)("i",{className:"fa fa-linkedin"})})]}),Object(m.jsx)("div",{className:"footerEmailArea",children:Object(m.jsx)("p",{className:"footerEmailFont",children:"andrescalderonn1995@gmail.com"})})]})})},x=(n(106),"https://personalblog55.herokuapp.com/");function O(){var e=a.a.useContext(h),t=Object(o.e)();var n=a.a.useState([]),c=Object(d.a)(n,2),r=c[0],s=c[1],i=a.a.useState(4),l=Object(d.a)(i,2),O=l[0],f=l[1];a.a.useEffect((function(){v()}),[e]);var v=function(){fetch(x+"/Post/ReadByCategory.php?Category="+e).then(function(){var e=Object(u.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.text().then((function(e){var t=JSON.parse(e);s(t)}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Database connection error...")})),g()},N=function(){g(),f((function(e){return e+4}))},g=function(){r.length<=O&&(document.getElementById("morePostsButton").style.display="none")};return Object(m.jsxs)("div",{children:[Object(m.jsx)(b,{}),Object(m.jsx)("div",{children:Object(m.jsxs)("div",{children:[Object(m.jsx)("div",{className:"posts",children:r.slice(0,O).map((function(e){return Object(m.jsxs)("div",{className:"postGrid",onClick:function(){var n,c;n=e.ID.toString(),c=e.Title,t.push("post/"+n+"/"+c.replace(" ","%20"))},children:[Object(m.jsx)("img",{className:"postGridImage",src:e.CoverPhotoLink}),Object(m.jsxs)("div",{className:"postGridInformation",children:[Object(m.jsx)("h2",{className:"postGridTitle",children:e.Title}),Object(m.jsx)("p",{className:"postGridCategory",children:"Category: "+e.Category}),Object(m.jsx)("p",{className:"postGridDate",children:e.PostDate})]})]})}))}),Object(m.jsx)("div",{className:"morePostsButtonArea",children:Object(m.jsx)("button",{className:"morePostsButton",id:"morePostsButton",onClick:N,children:"More"})})]})}),Object(m.jsx)(p,{})]})}var f=n(55),v=n(56),N=n(353),g=n(84),C=n(90),k=n(78),y=(n(107),n(79)),w=n.n(y);function P(){var e=Object(o.f)().pathname.split("/"),t=e[2],n=e[3],c=a.a.useState([]),r=Object(d.a)(c,2),s=r[0],i=r[1],l=a.a.useState(!0),h=Object(d.a)(l,2),O=h[0],y=h[1],P=a.a.useState([]),D=Object(d.a)(P,2),S=D[0],A=D[1],I=a.a.useState("0.0.0.0"),T=Object(d.a)(I,2),L=T[0],E=T[1];a.a.useEffect(Object(u.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return B(),e.next=3,_();case 3:return e.next=5,F();case 5:case"end":return e.stop()}}),e)}))),[]);var B=function(){fetch("https://api.db-ip.com/v2/free/self",{method:"GET"}).then((function(e){return e.json().then((function(e){E(e.ipAddress)}))})).catch((function(e){return alert("Fatal error...")}))},_=function(){var e=Object(u.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(x+"/Post/ReadConcrete.php?ID="+t.toString()).then(function(){var e=Object(u.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text().then((function(e){var t=JSON.parse(e);i(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Post content error! Database connection error...")}));case 2:0==s.length&&y(!1);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=function(){var e=Object(u.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(x+"/UserComment/ReadForConcretePost.php?PostID="+t.toString()).then(function(){var e=Object(u.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.text().then((function(e){var t=JSON.parse(e);A(t)}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return alert("Comments error! Database connection error...")}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),M=function(e){return Object(m.jsx)(N.a,{style:g.a,language:e.className?e.className.substring(9):"",children:e.children?e.children:""})};return Object(m.jsxs)("div",{children:[Object(m.jsx)(b,{}),Object(m.jsx)("div",{children:s.ID&&s.Title===n.replace("%20"," ")?Object(m.jsxs)("div",{children:[Object(m.jsx)("div",{className:"PostArea",children:Object(m.jsx)(f.a,{rehypePlugins:[v.a,C.a],components:{code:M},children:"<h1 align='center'>"+s.Title+"</h1><h6 align='center'>"+s.PostDate.substring(0,16)+"</h6><br/>"+s.Content,className:w.a.reactMarkDown})}),Object(m.jsx)("div",{children:Object(m.jsxs)("div",{className:"commentsArea",children:[Object(m.jsxs)("form",{action:x+"/UserComment/Create.php",method:"POST",class:"commentsForm",children:[Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{className:"commentInputLabel",children:"Nick"}),Object(m.jsx)("input",{className:"nickInput",name:"Nick",id:"Nick",type:"text",placeholder:"Enter a nick...",autocomplete:"off",required:!0,minLength:3})]}),Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{className:"commentInputLabel",children:"Comment"}),Object(m.jsx)("input",{className:"commentInput",name:"Content",id:"Content",type:"text",placeholder:"Enter your comment...",autocomplete:"off",required:!0,minLength:2,maxLength:280})]}),Object(m.jsxs)("div",{className:"hiddenValues",children:[Object(m.jsx)("input",{name:"PostID",id:"PostID",type:"hidden",value:t}),Object(m.jsx)("input",{name:"IP",id:"IP",type:"hidden",value:L}),Object(m.jsx)("input",{name:"ClientURL",id:"ClientURL",type:"hidden",value:window.location.href})]}),Object(m.jsx)("div",{children:Object(m.jsx)("input",{className:"commentPostButton",name:"Submit",id:"Submit",type:"submit",value:"Post"})})]}),Object(m.jsx)("div",{className:"usersCommentsArea",children:S.map((function(e){var t=new Date(e.CommentDate+" "+Object(k.a)(e.TimeZone).utcOffsetStr);return Object(m.jsxs)("div",{className:"userCommentArea",children:[Object(m.jsx)("h4",{className:"userCommentNick",children:e.Nick}),Object(m.jsx)("p",{className:"userCommentContent",children:e.Content}),Object(m.jsx)("p",{className:"userCommentDate",children:t.toLocaleString("es-ES",{timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,day:"numeric",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1}).replaceAll("/",".")})]})}))})]})})]}):O?Object(m.jsx)("div",{children:Object(m.jsx)("h2",{align:"center",children:"Loading..."})}):Object(m.jsx)("h1",{className:"postText",children:"POST NOT EXIST..."})}),Object(m.jsx)(p,{})]})}var D=n.p+"static/media/ContentAbout.5975b81f.md",S=n(89),A=n.n(S);function I(){var e=Object(c.useState)(""),t=Object(d.a)(e,2),n=t[0],a=t[1];return fetch(D).then((function(e){return e.text()})).then((function(e){return a(e)})),Object(m.jsxs)("div",{children:[Object(m.jsx)(b,{}),Object(m.jsx)(f.a,{children:n,rehypePlugins:[v.a],className:A.a.reactMarkDown}),Object(m.jsx)(p,{})]})}n(339);var T=function(){return Object(m.jsxs)(i.a,{basename:"/",children:[Object(m.jsx)(h.Provider,{value:"All",children:Object(m.jsx)(o.a,{exact:!0,path:"/",component:O})}),Object(m.jsx)(h.Provider,{value:"Projects",children:Object(m.jsx)(o.a,{exact:!0,path:"/projects",component:O})}),Object(m.jsx)(o.a,{exact:!0,path:"/about",component:I}),Object(m.jsx)(o.a,{path:"/post/:id/:title",component:P})]})};s.a.render(Object(m.jsx)(a.a.StrictMode,{children:Object(m.jsx)(T,{})}),document.getElementById("root"))},79:function(e,t,n){e.exports={reactMarkDown:"markdown-styles_reactMarkDown__x_VD4"}},89:function(e,t,n){e.exports={reactMarkDown:"markdown-styles_reactMarkDown__YNP4u"}},98:function(e,t,n){}},[[340,1,2]]]);
//# sourceMappingURL=main.1aea530a.chunk.js.map