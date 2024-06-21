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
    const [searchedToken, setSearchedToken] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [fetchingPosts, setFetchingPosts] = useState(false); // Track fetching status
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
        setPosts([]);
        setPageNum(0);
        updateURL(selectedCategory, 0);
        fetchPosts();
    }, [selectedCategory]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        updateURL(selectedCategory, pageNum);
        fetchPosts();
    }, [pageNum]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const delay = setTimeout(() => {
            setPosts([]);
            setPageNum(0);
            updateURL(selectedCategory, 0);
            fetchPosts();
        }, 800);

        return () => clearTimeout(delay);
    }, [searchedToken]);

    const fetchCategories = async () => {
        try {
            const categories = await apiCategoryService.fetchCategories();
            setCategories(categories);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            alert('Failed to fetch categories. Please try again later.');
        }
    };

    const fetchPosts = async () => {
        setFetchingPosts(true); // Start fetching
        try {
            const newPostsPageable = await apiPostService.fetchPostsPageable(pageNum, searchedToken, selectedCategory);
            setTotalPages(newPostsPageable.totalPages);
            setPosts(newPostsPageable.content);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            alert('Failed to fetch posts. Please try again later.');
        } finally {
            setFetchingPosts(false); // Finish fetching
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
                searchedToken={searchedToken}
                setSearchedToken={setSearchedToken}
            />
            <PostsComponent
                posts={posts}
                loading={loading}
                page={pageNum}
                setPage={setPageNum}
                totalPages={totalPages}
                fetchPosts={fetchPosts}
                fetchingPosts={fetchingPosts}
            />
        </div>
    );
}