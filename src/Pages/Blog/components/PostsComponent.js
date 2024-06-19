import React from 'react';
import { FadeLoader } from 'react-spinners';
import defaultImage from '../../../Tools/Images/defaultPostImage.jpg';
import DateUtil from '../../../util/DateUtil';
import "./PostsComponent.css";

const PostsComponent = ({ posts, loading, page, setPage, fetchPosts}) => {
    const handleLoadMore = () => {
        setPage(page + 1);
        fetchPosts();
    };

    return (
        <div>
            {posts.length > 0 ? (
                <div>
                    <div className="posts">
                        {posts.map((post) => (
                            <a key={post.id} className="postGrid" href={post.getPostHref()}>
                                <img
                                    className="postGridImage"
                                    src={post.coverPhotoLink || defaultImage}
                                    onError={(e) => { e.target.onerror = null; e.target.src = defaultImage }}
                                    alt="Post Cover"
                                />
                                <div className="postGridInformation">
                                    <h2 className="postGridTitle">{post.title}</h2>
                                    <p className="postGridCategory">{'Category: ' + post.categoryName}</p>
                                    <p className="postGridDate">{DateUtil.convertStringDateTimezoneToClient(post.date)}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="morePostsButtonArea">
                        <button className="morePostsButton" id="morePostsButton" onClick={() => handleLoadMore()}>More</button>
                    </div>
                </div>
            ) : loading ? (
                <div style={{ marginTop: 0, paddingBottom: 90, textAlign: 'center' }}>
                    <FadeLoader />
                </div>
            ) : (
                <h6 style={{ fontSize: '150%', fontWeight: '100' }} align="center">There are no posts...</h6>
            )}
        </div>
    );
};

export default PostsComponent;