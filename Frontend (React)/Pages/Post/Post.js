import React from 'react';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import SyntaxHighlighter from 'react-syntax-highlighter';
import  railscasts  from 'react-syntax-highlighter/dist/esm/styles/hljs/railscasts';
import remarkGfm from 'remark-gfm';
import SyncLoader from "react-spinners/SyncLoader";

import { useLocation } from 'react-router-dom';

import {getTimezone} from 'countries-and-timezones';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import "./Post.css";
import style from "./markdown-styles.module.css";

import { prefixURLBackend } from '../../PrefixURLBackend/PrefixURLBackend';

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
        updateClientIP();
        await loadPost();
        await loadComments();
    }, []);

    const updateClientIP=()=>{
        fetch("https://api.db-ip.com/v2/free/self", {method:"GET"}).then(
            information=>information.json()
            .then( data=>{ setClientIP(data.ipAddress) }))
            .catch(e=>alert("Fatal error..."));
    };

    const loadPost=async()=>
    {
        await fetch(prefixURLBackend+"/Post/ReadConcrete.php?ID="+urlID.toString()).then(async(information)=>{ 
            await information.text()
            .then((data)=>{
                const json=JSON.parse(data);
                setPost(json);
            })
        }).catch(e => alert('Post content error! Database connection error...'));

        if(post.length==0)
            setDoesPostExist(false);
    };

    const loadComments=async()=>
    {
        await fetch(prefixURLBackend+"/UserComment/ReadForConcretePost.php?PostID="+urlID.toString())
            .then(async(information)=>{ information.text()
            .then(data=>{
                const json=JSON.parse(data);
                setComments(json);
            })
        }).catch(e => alert('Comments error! Database connection error...'));
    };

    const markdownCodeThemeComponent=(props)=>
    {
        return (
            <SyntaxHighlighter style={railscasts} language={(props.className)?props.className.substring(9):""} 
                children={(props.children)?props.children:""}/>
        );
    };

    const printComments=()=>
    {
        return(
            comments.map(comment=>
            {
                const clientDate=new Date(comment.CommentDate+" "+getTimezone(comment.TimeZone).utcOffsetStr);

                return(
                    <div className="userCommentArea">
                        <h4 className="userCommentNick">{comment.Nick}</h4>
                        <p className="userCommentContent">{comment.Content}</p>
                        <p className="userCommentDate">
                        {
                            clientDate.toLocaleString('es-ES', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, 
                                day: 'numeric',  month: '2-digit', year: 'numeric', hour: "2-digit", minute:"2-digit",
                                hour12: false }).replaceAll("/", ".")
                        }
                        </p>
                    </div>
                );
            })
        );
    };

    const printCommentsSection=()=>
    {
        return(
            <div className="commentsArea">
                <form action={(prefixURLBackend+"/UserComment/Create.php")} method="POST" class="commentsForm">
                    <div>
                        <label className="commentInputLabel">Nick</label>
                        <input className="nickInput" name="Nick" id="Nick" 
                            type="text" placeholder="Enter a nick..." 
                            autocomplete="off" required={true} minLength={3}/>
                    </div>
                    
                    <div>
                        <label className="commentInputLabel">Comment</label>
                        <input className="commentInput" name="Content" id="Content" 
                            type="text" placeholder="Enter your comment..." 
                            autocomplete="off" required={true} minLength={2} maxLength={280}/>
                    </div>

                    <div className="hiddenValues">
                        <input name="PostID" id="PostID" type="hidden" value={urlID} />
                        <input name="IP" id="IP" type="hidden" value={clientIP} />
                        <input name="ClientURL" id="ClientURL" type="hidden" value={window.location.href} />
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
        if(post.ID && post.Title===urlTitle.replace("%20", " "))
        {
            return(
                <div>
                    <div className="PostArea">
                        <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm]} 
                            components={{code: markdownCodeThemeComponent}}
                            children={"<h1 align='center'>"+post.Title+"</h1>"+
                            "<h6 align='center'>"+post.PostDate.substring(0,16)+"</h6><br/>"+post.Content} 
                            className={style.reactMarkDown} />
                    </div>
                    <div>{printCommentsSection()}</div>
                </div>
            );
        }

        else if(doesPostExist)
        {
            return (
                <div ><h2 align="center">Loading...</h2></div>
            );
        }
        
        return (
            <h1 className="postText">POST NOT EXIST...</h1>
        );
    };

    return(
        <div>
            <Header/>
            <div>{printPostAndCommentsSection()}</div>
            <Footer/>
        </div>
    );   
}