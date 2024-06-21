import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DateUtil from '../../../util/DateUtil';
import PostComponent from '../../Post/components/PostComponent';
import ApiPostService from '../../../api/ApiPostService';
import ApiCategoryService from '../../../api/ApiCategoryService';
import UpdatePostRequest from '../../../data/dto/request/update/UpdatePostRequest';
import CreatePostRequest from '../../../data/dto/request/create/CreatePostRequest';

const PostSectionComponent = () => {
    const apiPostService = new ApiPostService(process.env.REACT_APP_BACKEND_URL);
    const apiCategoryService = new ApiCategoryService(process.env.REACT_APP_BACKEND_URL);

    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [editingPost, setEditingPost] = useState(new CreatePostRequest('', '', '', '')); // For tracking edited fields
    const [reviewPost, setReviewPost] = useState(null); // For tracking review state
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageable, setPageable] = useState({ totalPages: 0, totalElements: 0 });

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, [page, pageSize]);

    const fetchPosts = async () => {
        try {
            const response = await apiPostService.fetchPostsPageable(page, "", "");
            setPosts(response.content);
            setPageable({
                totalPages: response.totalPages,
                totalElements: response.totalElements
            });
        } catch (error) {
            console.log('Error fetching posts:', error.message);
        }
    };

    const fetchCategories = async () => {
        try {
            const cats = await apiCategoryService.fetchCategories();
            setCategories(cats);
        } catch (error) {
            console.log('Error fetching categories:', error.message);
        }
    };

    const fetchPost = async (id) => {
        try {
            const post = await apiPostService.fetchPost(id);
            setSelectedPost(post);
            setEditingPost({ ...post }); // Make a copy of the post for editing
        } catch (error) {
            console.log('Error fetching post:', error.message);
            alert('Failed to fetch post');
        }
    };

    const putPost = async (updatedPost) => {
        try {
            await apiPostService.putPost(updatedPost.id, new UpdatePostRequest(updatedPost.categoryId, updatedPost.title, updatedPost.content, updatedPost.date, updatedPost.coverPhotoLink));
            fetchPosts(); // Refresh current page
            resetSelectedPost();
        } catch (error) {
            console.log('Error updating post:', error.message);
            alert('Failed to update post');
        }
    };

    const postNewPost = async (newPost) => {
        try {
            await apiPostService.postPost(new CreatePostRequest(newPost.categoryId, newPost.title, newPost.content, newPost.coverPhotoLink));
            fetchPosts(); // Refresh current page
            resetSelectedPost();
        } catch (error) {
            console.log('Error creating post:', error.message);
            alert('Failed to create post');
        }
    };

    const deletePost = async (id) => {
        try {
            await apiPostService.deletePost(id);
            fetchPosts(); // Refresh current page
            resetSelectedPost();
        } catch (error) {
            console.log('Error deleting post:', error.message);
            alert('Failed to delete post');
        }
    };

    const resetSelectedPost = () => {
        setSelectedPost(null);
        setEditingPost((prevState) => new CreatePostRequest(prevState.categoryId, prevState.title, prevState.content, prevState.coverPhotoLink));
        setReviewPost(null);
    };

    const handleFieldChange = (e) => {
        const { id, value } = e.target;
        setEditingPost({
            ...editingPost,
            [id]: value,
        });
    };

    const handleTextAreaChange = (e) => {
        const { id, value } = e.target;
        setEditingPost({
            ...editingPost,
            [id]: value,
        });
    };

    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            flex: 1,
            renderCell: (params) => (
                <a
                    style={{
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textDecoration: 'none',
                    }}
                    href={`/#/post/${params.row.id}/${params.value}`}
                    target="_blank"
                >
                    {params.value}
                </a>
            ),
        },
        { field: 'categoryName', headerName: 'Category', flex: 1 },
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            renderCell: (params) => DateUtil.convertStringDateTimezoneToClient(params.value),
        },
        {
            field: 'commentsCount',
            headerName: 'Comments',
            flex: 0.5,
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <>
                    <Button
                        style={{ backgroundColor: '#ffcc00', width: '48%', marginRight: '4%', padding: '3px 35px' }}
                        onClick={() => fetchPost(params.row.id)}
                        variant="contained"
                        type="button"
                    >
                        Edit
                    </Button>
                    <Button
                        style={{ backgroundColor: '#e8605d', width: '48%', padding: '3px 35px' }}
                        onClick={() => deletePost(params.row.id)}
                        variant="contained"
                        type="button"
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const handleSave = () => {
        if (selectedPost) {
            putPost({ ...editingPost });
        } else {
            postNewPost(editingPost);
        }
    };

    const handleReview = () => {
        setReviewPost({ ...editingPost });
    };

    return (
        <div>
            <div style={{ flex: '50%', height: '100vh', overflowY: 'auto', paddingRight: '10px' }}>
                <div style={{ height: 'calc(100% - 20px)' }}>
                    <DataGrid
                        columns={columns}
                        rows={posts}
                        components={{
                            NoRowsOverlay: () => (
                                <Stack height="100%" alignItems="center" justifyContent="center">
                                    No posts available.
                                </Stack>
                            ),
                            Toolbar: GridToolbar,
                        }}
                        pagination
                        pageSize={pageSize}
                        rowsPerPageOptions={[8, 16, 24]} // Customize as per your requirements
                        rowCount={pageable.totalElements}
                        paginationMode="server"
                        onPageChange={(newPage) => setPage(newPage)}
                        onPageSizeChange={(newPageSize) => {
                            setPageSize(newPageSize);
                            setPage(0); // Reset to first page
                        }}
                        getRowId={(row) => row.id}
                    />
                </div>
            </div>

            <div className="postSection" style={{ display: 'flex' }}>
                <div style={{ flex: '50%', height: '110vh', overflowY: 'auto', paddingLeft: '10px' }}>
                    <div style={{ height: 'calc(100% - 20px)', padding: '10px', boxSizing: 'border-box' }}>
                        <div className="postEditor">
                            <label>ID:</label>
                            <input className="IDLabel" type="number" id="id" value={editingPost?.id || ''} disabled />
                            <button onClick={resetSelectedPost}>Clear</button>
                            <div className="break" />

                            <label>Title:</label>
                            <input type="text" id="title" value={editingPost?.title || ''} onChange={handleFieldChange} />
                            <div className="break" />

                            <label>Date:</label>
                            <input type="datetime-local" id="date" value={editingPost?.date || ''} onChange={handleFieldChange} />
                            <div className="break" />

                            <label>Category:</label>
                            <select id="categoryId" value={editingPost?.categoryId || ''} onChange={handleFieldChange}>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <div className="break" />

                            <label>Cover Link:</label>
                            <input type="text" id="coverPhotoLink" value={editingPost?.coverPhotoLink || ''} onChange={handleFieldChange} />
                            <div className="break" />

                            <textarea
                                className="textArea"
                                style={{ width: '100%' }}
                                id="content"
                                value={editingPost?.content || ''}
                                onChange={handleTextAreaChange}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 9) {
                                        e.preventDefault();
                                        const element = document.getElementById('content');
                                        const start = element.selectionStart;
                                        const end = element.selectionEnd;
                                        element.value = element.value.substring(0, start) + '\t' + element.value.substring(end);
                                        element.selectionStart = element.selectionEnd = start + 1;
                                    }
                                }}
                            />
                            <div className="break" />

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    style={{ backgroundColor: '#000000', width: 'auto', padding: '3px 35px', marginTop: '7px', marginRight: '7px' }}
                                    onClick={resetSelectedPost}
                                    variant="contained"
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    style={{ backgroundColor: '#0c7d06', width: 'auto', padding: '3px 35px', marginTop: '7px' }}
                                    onClick={handleSave}
                                    variant="contained"
                                    type="button"
                                >
                                    Save
                                </Button>
                                <Button
                                    style={{ backgroundColor: '#0c7d06', width: 'auto', padding: '3px 35px', marginTop: '7px', marginLeft: '7px' }}
                                    onClick={handleReview}
                                    variant="contained"
                                    type="button"
                                >
                                    Review
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ flex: '50%', height: '100vh', overflowY: 'auto' }}>
                    <PostComponent post={reviewPost || selectedPost || editingPost} />
                </div>
            </div>
        </div>
    );
};

export default PostSectionComponent;