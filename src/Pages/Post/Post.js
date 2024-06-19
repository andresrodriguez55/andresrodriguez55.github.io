import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Post.css";
import { FadeLoader } from 'react-spinners';


import DateUtil from '../../util/DateUtil';
import ApiPostService from '../../api/ApiPostService';
import ApiSubscribedEmailService from '../../api/ApiSubscribedEmailService';
import ApiCountryService from '../../api/ApiCountryService';
import ApiCommentService from '../../api/ApiCommentService';


import PostComponent from './components/PostComponent';
import SubscribeComponent from './components/SubscribeComponent';


export default function Post()
{
    const suffixUrl = useLocation().pathname;
    const informationUrl=suffixUrl.split("/");
    const urlID=informationUrl[2];

    const [post, setPost] = React.useState(null);
    const [comments, setComments] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const [clientCountry, setClientCountry]=React.useState("Unknown");

    const [commentParentId, setCommentParentId] = React.useState(null);

    const [, forceUpdate] = React.useReducer(x => x + 1, 0);

    const apiPostService = new ApiPostService(process.env.REACT_APP_BACKEND_URL);
    const apiCommentService = new ApiCommentService(process.env.REACT_APP_BACKEND_URL);
    const apiCountryService = new ApiCountryService(process.env.CLIENT_COUNTRY_FINDER_API);
    const apiSubscribedEmailService = new ApiSubscribedEmailService(process.env.REACT_APP_BACKEND_URL);

    React.useEffect(async()=>
    {
        await fetchPost();
        await fetchComments();
        await fetchClientCountry();
    }, []);

    const fetchClientCountry=async()=>
    {
        try{
            const country = await apiCountryService.fetchClientCountry();
            setClientCountry(country);
        } catch(error){
            console.log(`Failed to fetch country: ${error.message}`)
        }
    };

    const fetchPost=async()=>
    {
        setIsLoading(true);
        try {
            const post = await apiPostService.fetchPost(urlID);
            setPost(post);
        } catch (error) {
            console.error('Failed to fetch post:', error);
            alert('Failed to fetch post. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchComments=async()=>
    {
        setIsLoading(true);
        try {
            const comments = await apiCommentService.fetchComments(urlID);
            setComments(comments);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
            alert('Failed to fetch comments. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };



    const printComments=()=>
    {
        return(
            comments?.map(parentComment=>
            {
                return(
                    <div>
                        <div className="userCommentArea" id={parentComment.id.toString()}>
                            <h4 className="userCommentNick">{parentComment.nickname}</h4>
                            <p className="userCommentDate">
                            {
                                DateUtil.convertStringDateTimezoneToClient(parentComment.date)
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
                            parentComment.childrenComments.map(childComment =>
                            {
                                return(
                                    <div>
                                        <div className={"userCommentArea childUserCommentArea"} id={childComment.id.toString()}>
                                            <h4 className="userCommentNick">{childComment.nickname}</h4>
                                            <p className="userCommentDate">
                                            {
                                                DateUtil.convertStringDateTimezoneToClient(childComment.date)
                                            }
                                            </p>
                                            <p className="userCommentContent">
                                                <div className="userCommentContent" 
                                                    dangerouslySetInnerHTML={{ __html: childComment.content }} />
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
            parentCommentId: commentParentId,
            nickname: document.getElementById("nick").value,
            content: document.getElementById("content").value,
            country: clientCountry,
            email: document.getElementById("email").value,
            notifyEmail: document.getElementById("reply").checked ? true : false,
        };

        const urlToFetch = process.env.REACT_APP_BACKEND_URL + "comments";
        await fetch((urlToFetch), 
            {method: "POST", body: JSON.stringify(comment), 
            headers: {'Content-Type': "application/json"}}).then(async(response)=>
        {
            if(response.ok)
            {
                const addedComment = await response.json();
                
                var added = false;
                comments.map((parentComment)=>
                {
                    if(parentComment.id === addedComment.parentId)
                    {
                        parentComment.childrenComments.push(addedComment);
                        added = true;
                    }
                    else
                    {
                        parentComment.childrenComments.map((childComment)=>
                        {
                            if(childComment.id === addedComment.parentId)
                            {
                                parentComment.childrenComments.push(addedComment);
                                added = true;
                            }
                        });
                    }
                });

                if(!added)
                    comments.push(addedComment);

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
            <div style={{width:"100%"}}>
                {<PostComponent post={post} />}{<SubscribeComponent apiSubscribedEmailService={apiSubscribedEmailService}/>}<div className="horizontalLine"/>{printCommentsSection()}
            </div>
        ); 
    }

    if(isLoading)
    {
        return (
            <div style={{margin: "30px 50px 120px auto", textAlign: "center"}}>
                <FadeLoader/>
            </div>
        );
    }
      

    return (
        <h6 style={{fontSize:"150%", fontWeight:"100"}} align="center">There are no posts...</h6>
    );

}