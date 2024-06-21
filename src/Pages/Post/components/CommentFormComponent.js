import React, { useState } from 'react';
import CreateCommentRequest from "../../../data/dto/request/create/CreateCommentRequest";
import "./CommentFormComponent.css";

const CommentFormComponent = ({ postComment, postId, parentCommentId, clientCountry }) => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [notifyEmail, setNotifyEmail] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const requestDto = new CreateCommentRequest(content, nickname, notifyEmail, postId, 
            parentCommentId, email, clientCountry);
        await postComment(requestDto);

        setNickname('');
        setEmail('');
        setContent('');
        setNotifyEmail(false);
    };

    return (
        <form onSubmit={handleSubmit} className="commuserCommentAreaentsForm">
            <label className="commentInputLabel">Nick</label>
            <input className="nickInput" id="nick" type="text" placeholder="Enter a nick..." 
                autoComplete="off" value={nickname} onChange={(e) => setNickname(e.target.value)} 
                required={true} minLength={3}/>

            <label className="commentInputLabel">Email</label>
            <input className="emailInput" id="email" type="email" placeholder="Enter a valid email..." 
                autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} 
                minLength={6} required={true}/>
            
            <label className="commentInputLabel">Comment</label>
            <input className="commentInput" id="content" type="text" placeholder="Enter your comment..." 
                autoComplete="off" value={content} onChange={(e) => setContent(e.target.value)}
                required={true} minLength={2} maxLength={280}/>           

            <input className="commentPostButton" name="Submit" id="submit" type="submit" value="Post" />

            <input className="replyInputInput" id="reply" type="checkbox"
                checked={notifyEmail} onChange={(e) => setNotifyEmail(e.target.checked)}/>
            <label className="commentInputLabel">Notify to email replies</label> <br/><br/>
        </form>
    );
};

export default CommentFormComponent;