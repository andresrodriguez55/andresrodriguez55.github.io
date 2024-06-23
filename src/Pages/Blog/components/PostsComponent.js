import React from 'react';
import { FadeLoader } from 'react-spinners';
import defaultImage from '../../../static/images/DefaultPostImage.jpg'
import DateUtil from '../../../util/DateUtil';
import './PostsComponent.css';

const PostsComponent = ({ posts, page, setPage, totalPages, fetchingPosts }) => {
    const handleNextPage = () => {
        if (page < totalPages - 1 && !fetchingPosts) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0 && !fetchingPosts) {
            setPage(page - 1);
        }
    };

    return (
        <div>
            {fetchingPosts && posts.length === 0 && (
                <div style={{ marginTop: 0, paddingBottom: 90, textAlign: 'center' }}>
                    <FadeLoader />
                </div>
            )}
            {!fetchingPosts && posts.length === 0 ? (
                <h6 style={{ fontSize: '150%', fontWeight: '100', textAlign: 'center' }}>There are no posts...</h6>
            ) : (
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

                    <div className="paginationControls">
                        <button
                            className="paginationButton"
                            onClick={handlePreviousPage}
                            disabled={page === 0 || fetchingPosts}
                        >
                            Previous
                        </button>
                        <span>Page {page + 1} of {totalPages}</span>
                        <button
                            className="paginationButton"
                            onClick={handleNextPage}
                            disabled={page === totalPages - 1 || fetchingPosts}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostsComponent;