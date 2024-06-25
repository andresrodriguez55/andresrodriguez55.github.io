import React from 'react';
import { useLocation } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

import ApiPostService from '../../api/ApiPostService';
import ApiSubscribedEmailService from '../../api/ApiSubscribedEmailService';
import ApiCountryService from '../../api/ApiCountryService';
import ApiCommentService from '../../api/ApiCommentService';

import PostComponent from './components/PostComponent';
import SubscribeComponent from './components/SubscribeComponent';
import CommentFormComponent from './components/CommentFormComponent';
import CommentsComponent from './components/CommentsComponent';

export default function Post() {
    const suffixUrl = useLocation().pathname;
    const urlID = suffixUrl.split("/")[2];

    const [post, setPost] = React.useState(null);
    const [comments, setComments] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [clientCountry, setClientCountry] = React.useState("Unknown");
    const [commentParentId, setCommentParentId] = React.useState(null);

    const apiPostService = new ApiPostService(process.env.REACT_APP_BACKEND_URL);
    const apiCommentService = new ApiCommentService(process.env.REACT_APP_BACKEND_URL);
    const apiCountryService = new ApiCountryService(process.env.REACT_APP_CLIENT_COUNTRY_FINDER_API);
    const apiSubscribedEmailService = new ApiSubscribedEmailService(process.env.REACT_APP_BACKEND_URL);

    React.useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchPost(), fetchComments(), fetchClientCountry()]);
        };
        fetchData();
    }, []);

    const fetchClientCountry = async () => {
        try {
            const country = await apiCountryService.fetchClientCountry();
            setClientCountry(country);
        } catch (error) {
            console.error('Failed to fetch country:', error);
        }
    };

    const fetchPost = async () => {
        setIsLoading(true);
        try {
            const post = await apiPostService.fetchPost(urlID);
            setPost(post);
        } catch (error) {
            console.error('Failed to fetch post:', error);
            //alert('Failed to fetch post. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchComments = async () => {
        //setIsLoading(true);
        try {
            const comments = await apiCommentService.fetchCommentsOfPost(urlID);
            setComments(comments);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
            //alert('Failed to fetch comments. Please try again later.');
        } finally {
            //setIsLoading(false);
        }
    };

    const scrollToComment = (commentId) => {
        const element = document.getElementById(commentId.toString());
        if (element) {
            const yOffset = -50;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const postComment = async (commentDto) => {
        console.log(commentDto)
        try {
            const addedComment = await apiCommentService.postComment(commentDto);
            await fetchComments();
            scrollToComment(addedComment.id);
        } catch (error) {
            console.error('Failed to post comment:', error);
            alert('Failed to post comment. Please try again later.');
        }
    };

    const renderCommentsSection = () => (
        <div className="commentsArea">
            {commentParentId == null && (
                <CommentFormComponent
                    postComment={postComment}
                    clientCountry={clientCountry}
                    parentCommentId={commentParentId}
                    postId={urlID}
                />
            )}
            <CommentsComponent
                comments={comments}
                commentParentId={commentParentId}
                setCommentParentId={setCommentParentId}
                postComment={postComment}
                clientCountry={clientCountry}
                postId={urlID}
            />
        </div>
    );

    if (isLoading) {
        return (
            <div style={{ margin: "30px 50px 120px auto", textAlign: "center" }}>
                <FadeLoader />
            </div>
        );
    }

    return post ? (
        <div style={{ width: "100%" }}>
            <PostComponent post={post} />
            <SubscribeComponent apiSubscribedEmailService={apiSubscribedEmailService} />
            <div className="horizontalLine" />
            {renderCommentsSection()}
        </div>
    ) : (
        <h6 style={{ fontSize: "150%", fontWeight: "100" }} align="center">There are no posts...</h6>
    );
}