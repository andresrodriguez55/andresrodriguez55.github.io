import React from 'react';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import SyntaxHighlighter from 'react-syntax-highlighter';
import  railscasts  from 'react-syntax-highlighter/dist/esm/styles/hljs/railscasts';
import remarkGfm from 'remark-gfm';

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import { useLocation } from 'react-router-dom';

import "./Post.css";
import style from "./markdown-styles.module.css";

import { prefixURLBackend } from '../../Tools/PrefixURLBackend/PrefixURLBackend';

import { FadeLoader } from 'react-spinners';

import defaultImage from '../../Tools/Images/defaultPostImage.jpg';

export default function Post()
{
    const suffixUrl = useLocation().pathname;
    const informationUrl=suffixUrl.split("/");
    const urlID=informationUrl[2];

    const [post, setPost] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const [clientCountry, setClientCountry]=React.useState("Unknown");

    const [commentParentId, setCommentParentId] = React.useState(null);
    const nicksByCommentId = {}

    const [, forceUpdate] = React.useReducer(x => x + 1, 0);

    React.useEffect(async()=>
    {
        await fetchPost();
        await fetchClientCountry();
    }, []);

    const fetchClientCountry=async()=>
    {
        await fetch("https://ipapi.co/json/").then(async(response) =>
        {
            if(response.ok)
            {
                const info = await response.json();
                setClientCountry(info.country_name);
            }
        }).catch(error => console.log(error));
    };

    const fetchPost=async()=>
    {
        setIsLoading(true);

        const urlToFetch = prefixURLBackend + "Post/" + urlID.toString();
        await fetch(urlToFetch).then(async(response)=>
        {
            if(response.ok)
            {
                const postJson = await response.json();
                setPost(postJson);
            }
        }).catch(error => console.log(error));

        setIsLoading(false);
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
        const serverDate=new Date(stringDate.replace("T", " ")+" +03:00"); //Server timezone

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

    const printPost=()=>
    {
        return(
            <div className="PostArea">
                <div className='postInfo' >
                    <img alt='' className='postImage' src={post.coverPhotoLink} 
                        onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src=defaultImage}}/>
                        <div className='postHeaderText'>
                            <h1 className='postTitleX' align='center'>{post.title}</h1>
                            <h6 className='postDate' align='center'>{convertStringDateTimezoneToClient(post.postDate)}</h6>
                        </div>
                </div>
                <br/>
                <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm, rehypeKatex]} 
                    components={{code: markdownCodeThemeComponent}}
                    remarkPlugins={[remarkMath]}
                    children={post.content} className={style.reactMarkDown} />
            </div>
        );
    };

    const printComments=()=>
    {
        return(
            post.userComments?.map(parentComment=>
            {
                nicksByCommentId[parentComment.id] = parentComment.nick;

                return(
                    <div>
                        <div className="userCommentArea" id={parentComment.id.toString()}>
                            <h4 className="userCommentNick">{parentComment.nick}</h4>
                            <p className="userCommentDate">
                            {
                                convertStringDateTimezoneToClient(parentComment.commentDate)
                            }
                            </p>
                            <p className="userCommentContent">{parentComment.content}</p>
                            <p className="userCommentReply" onClick={()=>
                                setCommentParentId((commentParentId !== parentComment.id) ? parentComment.id : null)}>
                            {
                                (commentParentId !== parentComment.id) ? "Reply" : "Cancel reply"
                            }
                            </p>
                        </div>
                        {
                            (commentParentId !== parentComment.id) ? null : commentForm()
                        }
                        {
                            parentComment.inverseParent.map(childComment =>
                            {
                                nicksByCommentId[childComment.id] = childComment.nick;
                                
                                return(
                                    <div>
                                        <div className={"userCommentArea childUserCommentArea"} id={childComment.id.toString()}>
                                            <h4 className="userCommentNick">{childComment.nick}</h4>
                                            <p className="userCommentDate">
                                            {
                                                convertStringDateTimezoneToClient(childComment.commentDate)
                                            }
                                            </p>
                                            <p className="userCommentContent">
                                            <b>{(parentComment.id == childComment.parentId) ? "" : "@"+nicksByCommentId[childComment.parentId]}</b>
                                            {
                                                " "+childComment.content
                                            }
                                            </p>
                                            <p className="userCommentReply" onClick={()=>
                                                setCommentParentId((commentParentId !== childComment.id) ? 
                                                    childComment.id : null)}>
                                            {   
                                                (commentParentId !== childComment.id) ? "Reply" : "Cancel reply"
                                            }
                                            </p>
                                        </div>
                                        {
                                            (commentParentId !== childComment.id) ? null : commentForm()
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                );
            })
        );
    };

    

    const scrollToComment = (commentId) => 
    {
        const yOffset = -50; 
        const element = document.getElementById(commentId.toString());
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({top: y, behavior: 'smooth'});
    }
    
    const postComment=async(e)=>
    {
        e.preventDefault();
        
        const comment = 
        {
            postId: parseInt(urlID),
            parentId: commentParentId,
            nick: document.getElementById("nick").value,
            content: document.getElementById("content").value,
            country: clientCountry,
            email: document.getElementById("email").value,
            notifyReply: document.getElementById("reply").checked ? 1 : 0,
        };

        const urlToFetch = prefixURLBackend + "UserComment";
        await fetch((urlToFetch), 
            {method: "POST", body: JSON.stringify(comment), 
            headers: {'Content-Type': "application/json"}}).then(async(response)=>
        {
            if(response.ok)
            {
                const addedComment = await response.json();
                nicksByCommentId[addedComment.id] = addedComment.nick;
                
                var added = false;
                post.userComments.map((parentComment)=>
                {
                    if(parentComment.id === addedComment.parentId)
                    {
                        parentComment.inverseParent.push(addedComment);
                        added = true;
                    }
                    else
                    {
                        parentComment.inverseParent.map((childComment)=>
                        {
                            if(childComment.id === addedComment.parentId)
                            {
                                parentComment.inverseParent.push(addedComment);
                                added = true;
                            }
                        });
                    }
                });

                if(!added)
                    post.userComments.push(addedComment);

                setCommentParentId(-1);
                setCommentParentId(null);
                while(document.getElementById(addedComment.id.toString()) == null) ;
                scrollToComment(addedComment.id);
                
            }
            else
                console.log(await response.text());
        }).catch(e => alert(e));     
    };
    

    const commentForm = ()=>
    {
        return (
            <form onSubmit={(e)=>postComment(e)} className="commuserCommentAreaentsForm">
                <label className="commentInputLabel">Nick</label>
                <input className="nickInput" id="nick" type="text" placeholder="Enter a nick..." 
                    autoComplete="off" required={true} minLength={3}/>

                <label className="commentInputLabel">Email</label>
                <input className="emailInput" id="email" type="email" placeholder="Enter a valid email..." 
                    autoComplete="off" minLength={6} required={true}/>
                
                <label className="commentInputLabel">Comment</label>
                <input className="commentInput" id="content" type="text" placeholder="Enter your comment..." 
                    autoComplete="off" required={true} minLength={2} maxLength={280}/>           

                <input className="commentPostButton" name="Submit" id="submit" type="submit" value="Post" />

                <input className="replyInputInput" id="reply" type="checkbox"/>
                <label className="commentInputLabel">Notify to email replies</label> <br/><br/>
            </form>
        );
    }

    const printCommentsSection = ()=>
    {
        return(
            <div className="commentsArea">
                {
                    (commentParentId != null) ? null : commentForm()
                }
                <div className="usersCommentsArea">{printComments()}</div>
            </div>
        );
    }

    if(post != null)
    {
        return(
            <div >
                <div>{printPost()}{printCommentsSection()}</div>
            </div>
        ); 
    }

    if(isLoading)
    {
        return (
            <div style={{margin: "30px auto 120px auto", textAlign: "center"}}>
                <FadeLoader/>
            </div>
        );
    }
      

    return (
        <h6 style={{fontSize:"150%", fontWeight:"100"}} align="center">There are no posts...</h6>
    );

}