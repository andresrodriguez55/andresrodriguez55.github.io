import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiPostService from '../../api/ApiPostService';
import ApiCategoryService from '../../api/ApiCategoryService';
import CategoriesComponent from './components/CategoriesComponent';
import PostsComponent from './components/PostsComponent';

export default function Blog() {
    const { pathname } = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(pathname === '/' ? 'All' : 'Projects');
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchedToken, setSearchedToken] = useState('');
    const isInitialMount = useRef(true);

    const apiPostService = new ApiPostService(process.env.REACT_APP_BACKEND_URL);
    const apiCategoryService = new ApiCategoryService(process.env.REACT_APP_BACKEND_URL);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchCategories();
                await fetchPosts();
            } catch (error) {
                console.error('Failed to initialize data:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        setPosts([]);
        setPage(0);
        fetchPosts();
    }, [selectedCategory]);

    useEffect(() => {
        if (isInitialMount.current) {
            return;
        }
        const delay = setTimeout(() => {
            setPosts([]);
            setPage(0);
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
        setLoading(true);
        try {
            const newPostsPageable = await apiPostService.fetchPostsPageable(page, searchedToken, selectedCategory);
            newPostsPageable.last ? hideMoreButton() : showMoreButton();
            const newPosts = newPostsPageable.content;
            setPosts(prevPosts => [...prevPosts, ...newPosts]);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            alert('Failed to fetch posts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const hideMoreButton = () => {
        const element = document.getElementById('morePostsButton');
        if (element) element.style.display = 'none';
    };

    const showMoreButton = () => {
        const element = document.getElementById('morePostsButton');
        if (element) element.style.display = 'inline-block';
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
                page={page}
                setPage={setPage}
                fetchPosts={fetchPosts}
            />
        </div>
    );
}