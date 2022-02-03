import React from 'react';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import SyntaxHighlighter from 'react-syntax-highlighter';
import  railscasts  from 'react-syntax-highlighter/dist/esm/styles/hljs/railscasts';
import remarkGfm from 'remark-gfm';

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import { useLocation } from 'react-router-dom';

import Header from '../../Tools/Header/Header';
import Footer from '../../Tools/Footer/Footer';
import "./Post.css";
import style from "./markdown-styles.module.css";

import { prefixURLBackend } from '../../Tools/PrefixURLBackend/PrefixURLBackend';
import { Alert } from '@mui/material';

export default function Post()
{
    const suffixUrl = useLocation().pathname;

    const informationUrl=suffixUrl.split("/");
    const urlID=informationUrl[2];
    const urlTitle=informationUrl[3];

    const [post, setPost] = React.useState([]);
    const [doesPostExist, setDoesPostExist] = React.useState(true);
    const [comments, setComments]=React.useState([]);
    const [clientIP, setClientIP]=React.useState("0.0.0.0");

    React.useEffect(async()=>
    {
        await loadPost();
        await updateClientIP();
        await loadComments();
    }, []);

    const updateClientIP=async()=>
    {
        if(doesPostExist)
        {
            await fetch("https://api.ipify.org/?format=json", {method:"GET"}).then
            (
                async(information)=> await information.json().then
                ( 
                    data=>{ setClientIP(data.ip);}
                )
            ).catch(e=>alert("Your IP could not be obtained, for this reason you will not be able to comment..."));
        }
    };

    const loadPost=async()=>
    {
        await fetch(prefixURLBackend+"Post/ReadConcrete.php?ID="+urlID.toString()).then(async(information)=>
        { 
            await information.text()
            .then((data)=>
            {
                const json=JSON.parse(data);
                setPost(json);
            })
        }).catch(e => alert('Post content error! Database connection error...'));

        if(post.length==0)
            setDoesPostExist(false);
    };

    const loadComments=async()=>
    {
        await fetch(prefixURLBackend+"UserComment/ReadForConcretePost.php?PostID="+urlID.toString())
            .then(async(information)=>
            { 
                await information.text()
                .then(data=>
                    {
                        const json=JSON.parse(data);
                        setComments(json);
                    })
            })
            .catch(e => alert('Comments error! Database connection error...'));
    };

    const markdownCodeThemeComponent=(props)=>
    {
        return (
            <SyntaxHighlighter style={railscasts} language={(props.className)?props.className.substring(9):""} 
                children={(props.children)?props.children:""}/>
        );
    };

    const convertStringDateTimezoneToClient=(stringDate)=>
    {
        const serverDate=new Date(stringDate+" +03:00"); //Server timezone

        if(serverDate.toString().localeCompare("Invalid Date")!=0)
        {
            return serverDate.toLocaleString('es-ES', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, 
                day: 'numeric',  month: '2-digit', year: 'numeric', hour: "2-digit", minute:"2-digit",
                hour12: false });
        }
    
        //Prevent invalid date, return actual client date
        return new Date().toLocaleString('es-ES', {  day: 'numeric',  month: '2-digit', year: 'numeric', 
            hour: "2-digit", minute:"2-digit", hour12: false });
    };

    const printComments=()=>
    {
        return(
            comments.map(comment=>
            {
                return(
                    <div className="userCommentArea">
                        <h4 className="userCommentNick">{comment.Nick}</h4>
                        <p className="userCommentContent">{comment.Content}</p>
                        <p className="userCommentDate">
                        {
                            convertStringDateTimezoneToClient(comment.CommentDate)
                        }
                        </p>
                    </div>
                );
            })
        );
    };

    const submitComment=async(e)=>
    {
        e.preventDefault();

        const formData = new FormData();
        formData.append("Nick", document.getElementById("Nick").value);
        formData.append("Content", document.getElementById("Content").value);
        formData.append("PostID", urlID);
        formData.append("IP", clientIP);
        formData.append("ClientURL", window.location.href);
        formData.append("CommentDate", 
            (new Date()).toLocaleString("es-ES", {timeZone: "Europe/Istanbul"}).replaceAll("/", "-"));

        await fetch((prefixURLBackend+"UserComment/Create.php"),
        {
            method: "POST",
            body: formData
        }).then(async(response)=>{await response.text()
        .then(async(result)=>
        {
            if(result!="")
                alert(result);
            else 
                window.scrollTo(0,document.body.scrollHeight);
        })});     
        
        document.getElementById("Nick").value="";
        document.getElementById("Content").value="";
        loadComments();
    };

    const printCommentsSection= ()=>
    {
        return(
            <div className="commentsArea">
                <form  onSubmit={(e)=>submitComment(e)} className="commentsForm">
                    <div>
                        <label className="commentInputLabel">Nick</label>
                        <input className="nickInput" name="Nick" id="Nick" 
                            type="text" placeholder="Enter a nick..." 
                            autoComplete="off" required={true} minLength={3}/>
                    </div>
                    
                    <div>
                        <label className="commentInputLabel">Comment</label>
                        <input className="commentInput" name="Content" id="Content" 
                            type="text" placeholder="Enter your comment..." 
                            autoComplete="off" required={true} minLength={2} maxLength={280}/>
                    </div>
        
                    <div>
                        <input className="commentPostButton" name="Submit" id="Submit" 
                            type="submit" value="Post" />
                    </div>
                </form>

                <div className="usersCommentsArea">{printComments()}</div>
            </div>
        );
    }

    const printPostAndCommentsSection=()=>
    {
        if(post && post.Title===urlTitle.replace("%20", " "))
        {
           /* const image = new Image();
            image.src = post.CoverPhotoLink;

            image.onerror = function()
            {
                post.CoverPhotoLink ="https://images.clipartlogo.com/files/istock/previews/9032/90321003-glittering-blue-background.jpg";
            }*/

            return(
                <div>
                    <div className="PostArea">
                        <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm, rehypeKatex]} 
                            components={{code: markdownCodeThemeComponent}}
                            remarkPlugins={[remarkMath]}
                            children={"<div className='postInfo'><img alt='' className='postImage' src='"+post.CoverPhotoLink+"' />"+
                            "<div className='postHeaderText'><h1 className='postTitleX' align='center'>"+post.Title+"</h1>"+
                            "<h6 className='postDate' align='center'>"+convertStringDateTimezoneToClient(post.PostDate)+"</h6></div></div>"+
                            post.Content} 
                            className={style.reactMarkDown} />
                    </div>
                    <div>{printCommentsSection()}</div>
                </div>
            );
        }

        else if(doesPostExist)
        {
            return (
                <div ><h6 style={{fontSize:"150%", fontWeight:"100"}} align="center">Loading...</h6></div>
            );
        }
        
        return (
            <h6 style={{fontSize:"150%", fontWeight:"100"}} align="center">POST NOT EXIST...</h6>
        );
    };

    return(
        <div className="postScreen">
            <Header/>
            <div>{printPostAndCommentsSection()}</div>
            <Footer/>
        </div>
    );   
}