import React from 'react';
import {useLocation} from "react-router-dom";

import "./Blog.css";

import { prefixURLBackend } from '../../Tools/PrefixURLBackend/PrefixURLBackend';
import { prefixURLFrontend } from '../../Tools/PrefixURLFrontend/PrefixURLFrontend';

import { FadeLoader } from 'react-spinners';

import defaultImage from '../../Tools/Images/defaultPostImage.jpg';

export default function Blog()
{
    const initialCategory=(useLocation().pathname=="/")?"All":"Projects";
    const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);
    const [categories, setCategories] = React.useState([]);

    const [posts, setPosts] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const [searchedToken, setSearchedToken] = React.useState("");

    const isInitialMount = React.useRef(true);

    React.useEffect(async()=>
    {
        if(initialCategory!="All")
            hideSelectCategory();
        else 
            fetchCategories();
    }, []); //Only once time


    React.useEffect(async()=>
    {
        if(isInitialMount.current)
            return;
        

        posts.length = 0; //reset without render
        if(page==1)
            await fetchPosts();
        else
            setPage(1);

    }, [selectedCategory]);

    React.useEffect(async()=>
    {
        if(isInitialMount.current)
        {
            isInitialMount.current = false;
            return;
        }

        await fetchPosts();  
    }, [page]);

    React.useEffect(() => 
    {
        if(isInitialMount.current)
            return;

        const delay = setTimeout(() => 
        {
            posts.length = 0; //clear without render
            if(page==1)
                fetchPosts();
            else
                setPage(1);
        }, 800)
    
        return () => clearTimeout(delay)
    }, [searchedToken])
    

    const fetchCategories=async()=>
    {
        const urlToFetch = prefixURLBackend + "Category";

        const response = await fetch(urlToFetch).then(async(response)=>
        {
            if(response.ok)
            {
                const jsonArray = await response.json();
                setCategories(jsonArray);
            }
            else
                alert('Database connection error...');
        }).catch(e => 
        {
            console.log(e);
        });
    };

    const printCategories=()=>
    {
        return(
            <div className="displayCategoriesAndSearchBar">
                <select id="selectedCategory" onChange={()=>{updateSelectedCategory()}}>
                    <option value="All">All</option>
                    {
                        categories.map(c=>
                        {
                            return(
                                <option value={c.nameOfCategory}>
                                    {c.nameOfCategory}
                                </option>
                            );
                        })
                    }
                </select>
                
                <div>
                    <input type="text" placeholder="Search..." onChange={(event)=>setSearchedToken(event.target.value)}/>
                    
                </div>
            </div>
        );
    }; ////<i class="fa fa-search"></i>

    const fetchPosts=async()=>
    {
        setLoading(true);

        let urlToFetch = prefixURLBackend + "Post?pageSize=6&&pageNumber=" + page + "&&Contains=" + searchedToken;
        if(selectedCategory !== 'All')
            urlToFetch += "&&Category=" + selectedCategory;

        const response = await fetch(urlToFetch).then(async(response)=>
        {
            if(response.ok)
            {
                const jsonArray = await response.json();
                setPosts([...posts, ...jsonArray]);
                
                const pagesInfo = JSON.parse(response.headers.get("Paging-Headers"));
                if(pagesInfo.nextPage === 'No')
                    hideMoreButton();
                else
                    showMoreButton(); 
            }
            else
                alert('Database connection error...');
        }).catch(e => alert(e));

        setLoading(false);
    };

    const updateSelectedCategory=()=>
    {
        const selected = document.getElementById('selectedCategory');
        const value = selected.options[selected.selectedIndex].value;
        setSelectedCategory(value);
    };

    const hideSelectCategory=()=>
    {
        const element=document.getElementById('selectedCategory');
        if(element)
            element.style.visibility = 'hidden';
    };

    const hideMoreButton=()=>
    {
        const element=document.getElementById('morePostsButton');
        if(element)
            element.style.display = 'none';
    };

    const showMoreButton=()=>
    {
        const element=document.getElementById('morePostsButton');
        if(element)
            element.style.display = 'inline-block';
    };

    const convertStringDateTimezoneToClient=(stringDate)=>
    {
        const serverDate=new Date(stringDate.replace("T", " ")+" +03:00"); //Server timezone

        if(serverDate.toString().localeCompare("Invalid Date")!=0)
        {
            return serverDate.toLocaleString('es-ES', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, 
                day: 'numeric',  month: '2-digit', year: 'numeric', hour: "2-digit", minute:"2-digit",
                hour12: false });
        }
    
        //Prevent invalid date, return actual client date
        return new Date().toLocaleString('es-ES', {  day: 'numeric',  month: '2-digit', year: 'numeric', 
            hour: "2-digit", minute:"2-digit", hour12: false });
    };

    const printPosts=()=>
    {
        if(posts.length>0)
        {  
            return( 
                <div>
                    <div className="posts">
                    {
                        posts.map((post)=>
                        {
                            return(
                                <a className="postGrid" href={prefixURLFrontend+"post/"+post.id.toString()+"/"+post.title.replace(" ", "%20")}>
                                    <img className="postGridImage" src={post.coverPhotoLink} onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src=defaultImage}}/>
                                    <div className="postGridInformation">
                                        <h2 className="postGridTitle">{post.title}</h2>
                                        <p className="postGridCategory">{"Category: "+post.category}</p>
                                        <p className="postGridDate">{convertStringDateTimezoneToClient(post.postDate)}</p>
                                    </div>
                                </a>
                            );   
                        })
                    }
                    </div>
                    
                    <div className="morePostsButtonArea">
                        <button className="morePostsButton" id="morePostsButton"
                            onClick={()=>setPage(page+1)}>More</button>
                    </div>
                </div>
            );
        }

        else if(loading)
        {
            return (
                <div style={{margin: "30px auto 120px auto", textAlign: "center"}}>
                    <FadeLoader />
                </div>
            );
        }

        else
        {
            return (
                <h6 style={{fontSize:"150%", fontWeight:"100"}} align="center">There are no posts...</h6>
            );
        }
    };

    return(
        <div>
            {printCategories()}
            {printPosts()}
        </div>
    );
} 