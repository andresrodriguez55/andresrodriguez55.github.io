import React, { useState } from 'react';

const CommentForm = ({ postComment, parentId, clientCountry }) => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [notifyEmail, setNotifyEmail] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        postComment(e, { postId: parentId, nickname, email, content, country: clientCountry, notifyEmail });
        setNickname('');
        setEmail('');
        setContent('');
        setNotifyEmail(false);
    };

    return (
        <form onSubmit={handleSubmit} className="commentsForm">
            <label>Nickname</label>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} required />

            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Comment</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />

            <input type="checkbox" checked={notifyEmail} onChange={(e) => setNotifyEmail(e.target.checked)} />
            <label>Notify by email for replies</label>

            <button type="submit">Post</button>
        </form>
    );
};

export default CommentForm;