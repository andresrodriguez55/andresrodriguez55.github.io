import React, { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ApiPostService from '../../api/ApiPostService';
import ApiCategoryService from '../../api/ApiCategoryService';
import CategoriesComponent from './components/CategoriesComponent';
import PostsComponent from './components/PostsComponent';

export default function Blog() {
    const { category = 'All', page = '0' } = useParams();
    const history = useHistory();
    const [selectedCategory, setSelectedCategory] = useState(category);
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [pageNum, setPageNum] = useState(parseInt(page, 10));
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [fetchingPosts, setFetchingPosts] = useState(true);
    const isInitialMount = useRef(true);

    const apiPostService = new ApiPostService(process.env.REACT_APP_BACKEND_URL);
    const apiCategoryService = new ApiCategoryService(process.env.REACT_APP_BACKEND_URL);

    useEffect(() => {
        const initialize = async () => {
            await fetchCategories();
            await fetchPosts();
        };
        initialize();
    }, []);

    useEffect(() => {
        const fetchPostsOnCategoryChange = async () => {
            if (!isInitialMount.current) {
                //setPosts([]);
                setPageNum(0);
                updateURL(selectedCategory, 0);
                await fetchPosts();
            }
        };
        fetchPostsOnCategoryChange();
    }, [selectedCategory]);

    useEffect(() => {
        const fetchPostsOnPageChange = async () => {
            if (!isInitialMount.current) {
                updateURL(selectedCategory, pageNum);
                await fetchPosts();
            } else {
                isInitialMount.current = false;
            }
        };
        fetchPostsOnPageChange();
    }, [pageNum]);

    const fetchCategories = async () => {
        try {
            const categories = await apiCategoryService.fetchCategories();
            setCategories(categories);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const fetchPosts = async () => {
        setFetchingPosts(true);
        try {
            const newPostsPageable = await apiPostService.fetchPostsPageable(pageNum, "", selectedCategory);
            setTotalPages(newPostsPageable.totalPages);
            setPosts(newPostsPageable.content);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setFetchingPosts(false);
            setLoading(false);
        }
    };

    const updateURL = (category, page) => {
        history.push(`/${category}/${page}`);
    };

    return (
        <div>
            <CategoriesComponent
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <PostsComponent
                posts={posts}
                loading={loading}
                page={pageNum}
                setPage={setPageNum}
                totalPages={totalPages}
                fetchingPosts={fetchingPosts}
            />
        </div>
    );
}