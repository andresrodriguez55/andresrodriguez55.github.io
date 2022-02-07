import React from 'react';
import {useLocation} from "react-router-dom";

import Header from '../../Tools/Header/Header';
import Footer from '../../Tools/Footer/Footer';
import "./Blog.css";

import { prefixURLBackend } from '../../Tools/PrefixURLBackend/PrefixURLBackend';
import { prefixURLFrontend } from '../../Tools/PrefixURLFrontend/PrefixURLFrontend';

import defaultImage from '../../Tools/Images/defaultPostImage.jpg';

export default function Blog()
{
    const initialCategory=(useLocation().pathname=="/")?"All":"Projects";
    const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);
    const [categories, setCategories] = React.useState([]);

    const [allPosts, setAllPosts] = React.useState([]);
    const [postsShownToUser, setPostsShownToUser] = React.useState([]);
    const [areTherePosts, setAreTherePosts] = React.useState(true);
    const initialNumberOfVisiblePosts=4;
    const [numberOfVisiblePosts, setNumberOfVisiblePosts]=React.useState(initialNumberOfVisiblePosts);

    React.useEffect(async()=>
    {
        if(initialCategory=="All")
            getAndSetCategories();

        else 
            hideSelectCategory();

        await getAndSetAllPosts();
    }, []); //Only once time

    React.useEffect(async()=>
    {
        hideMoreButtonIfIsNecessary();
    }, [numberOfVisiblePosts]); 

    React.useEffect(async()=>
    {
        hideMoreButtonIfIsNecessary();
    }, [postsShownToUser]); 

    React.useEffect(async()=>
    {
        setNumberOfVisiblePosts(initialNumberOfVisiblePosts);
        showMoreButton(); //Show the button again if is necessary
        setFilteredShownPostsByChoosenCategory(); //Update shown posts   
    }, [selectedCategory])

    const getAndSetCategories=async()=>
    {
        const URLToFetch=prefixURLBackend+"Category/ReadCategoriesOfPosts.php";

        await fetch(URLToFetch).then(async(information)=>
        { 
            await information.text()
            .then(data=>{
                const json=JSON.parse(data);
                setCategories(json);
            })
        }).catch(e => alert(URLToFetch));
    };

    const setFilteredShownPostsBySearchedValue=(searchedValue)=>
    {
        setPostsShownToUser(
            allPosts.filter
            (
                function belongsToTheCategory(post)
                { 
                    return post.Title.toLowerCase().includes(searchedValue.toLowerCase()) &&  
                        (selectedCategory=="All" || post.Category==selectedCategory);
                }
            )
        );
    };

    const searchBarOnChange=()=>
    {
        const element=document.getElementById('searchBar');

        if(element)
        {
            if (element.value!="")
            {    
                setNumberOfVisiblePosts(allPosts.length);
                setFilteredShownPostsBySearchedValue(element.value);
            }

            else
                setFilteredShownPostsByChoosenCategory();
        }
    };

    const printCategoriesAndSearchBar=()=>
    {
        return(
            <div className="displayCategoriesAndSearchBar">
                <select id="selectedCategory" 
                    onChange={()=>{updateSelectedCategory()}}>
                    <option value="All">All</option>
                    {
                        categories.map(c=>
                        {
                            return(
                                <option value={c.NameOfCategory}>
                                    {c.NameOfCategory}
                                </option>
                            );
                        })
                    }
                </select>

                <input id="searchBar" className="searchBar" 
                    onChange={searchBarOnChange} type="text" placeholder='Search...'/>
            </div>
        );
    };

    const setFilteredShownPostsByChoosenCategory=()=>
    {
        setPostsShownToUser(
            allPosts.filter
            (
                function belongsToTheCategory(post)
                { 
                    return (selectedCategory=="All" || post.Category==selectedCategory)
                }
            )
        );
    };

    const getAndSetAllPosts=async()=>
    {
        let URLToFetch=prefixURLBackend+"Post/ReadByCategory.php"+
            ( (initialCategory=="All")?"":("?Category="+initialCategory) );
        //Get all posts or only projects posts

        await fetch(URLToFetch).then(async(information)=>
        { 
            await information.text()
            .then(data=>{
                const json=JSON.parse(data);
                setAllPosts(json);
                setPostsShownToUser(json); 
            })
        }).catch(e => alert('Database connection error...'));

        if(allPosts.length==0)
            setAreTherePosts(false);
    };

    const updateSelectedCategory=()=>
    {
        const selected = document.getElementById('selectedCategory');
        const value = selected.options[selected.selectedIndex].value;
        
        setSelectedCategory(value);
    };

    const incrementNumberOfVisiblePosts=()=>
    {
        setNumberOfVisiblePosts((val)=>val+4);
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

    const hideMoreButtonIfIsNecessary=()=>
    {
        if(postsShownToUser.length<numberOfVisiblePosts)
            hideMoreButton();
    };

    const showMoreButton=()=>
    {
        const element=document.getElementById('morePostsButton');
        if(element)
            element.style.display = 'inline-block';
    };

    const convertStringDateTimezoneToClient=(stringDate)=>
    {
        const serverDate=new Date(stringDate+" +03:00"); //Server timezone

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
        if(allPosts.length>0)
        {   
            return( 
                <div>
                    <div className="posts">
                    {
                        postsShownToUser.slice(0, numberOfVisiblePosts).map((post)=>
                        {
                            return(
                                <a className="postGrid" href={prefixURLFrontend+"post/"+post.ID.toString()+"/"+post.Title.replace(" ", "%20")}>
                                    <img className="postGridImage" src={post.CoverPhotoLink} onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src=defaultImage}}/>
                                    <div className="postGridInformation">
                                        <h2 className="postGridTitle">{post.Title}</h2>
                                        <p className="postGridCategory">{"Category: "+post.Category}</p>
                                        <p className="postGridDate">{convertStringDateTimezoneToClient(post.PostDate)}</p>
                                    </div>
                                </a>
                            );   
                        })
                    }
                    </div>
                    
                    <div className="morePostsButtonArea">
                        <button className="morePostsButton" id="morePostsButton"
                            onClick={incrementNumberOfVisiblePosts}>More</button>
                    </div>
                </div>
            );
        }

        else if(areTherePosts)
        {
            return (
                <div ><h6 style={{fontSize:"150%", fontWeight:"100"}} align="center">Loading...</h6></div>
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
        <div className="blogScreen">
            <Header/>
            <div>{printCategoriesAndSearchBar()}{printPosts()}</div>
            <Footer/>
        </div>
    );
} 