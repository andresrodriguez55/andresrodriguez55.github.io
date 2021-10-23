import React from 'react';
import {useHistory, useLocation} from "react-router-dom";

import Header from '../../Tools/Header/Header';
import Footer from '../../Tools/Footer/Footer';
import "./Blog.css";

import { prefixURLBackend } from '../../Tools/PrefixURLBackend/PrefixURLBackend';

export default function Blog()
{
    const history=useHistory();
    function redirect(ID, title)
    {
        history.push("post/"+ID+"/"+title.replace(" ", "%20"));
    };

    const initialCategory=(useLocation().pathname=="/")?"All":"Projects";
    const [selectedCategory, setSelectedCategory]= React.useState(initialCategory);
    const [categories, setCategories] = React.useState([]);
    const [posts, setPosts] = React.useState([]);
    const [areTherePosts, setAreTherePosts] = React.useState(true);
    const [numberOfVisiblePosts, setNumberOfVisiblePosts]=React.useState(4);

    React.useEffect(async()=>
    {
        await loadPosts();
        if(initialCategory=="All")
            loadCategories();
    }, []);

    const loadCategories=async()=>
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

    const loadPosts=async()=>
    {
        let URLToFetch=prefixURLBackend+"Post/ReadByCategory.php"+
            ( (selectedCategory=="All")?"":("?Category="+selectedCategory) );

        await fetch(URLToFetch).then(async(information)=>
        { 
            await information.text()
            .then(data=>{
                const json=JSON.parse(data);
                setPosts(json);
            })
        }).catch(e => alert('Database connection error...'));

        if(posts.length==0)
            setAreTherePosts(false);
    };

    const showMorePosts=()=>
    {
        setNumberOfVisiblePosts((val)=>val+4);
    };

    const ifIsNecesaryHideMoreButton=()=>
    {
        if(posts.length<=numberOfVisiblePosts && posts.length!=0)
            document.getElementById('morePostsButton').style.display = 'none';
    };

    const updateSelectedCategory=()=>
    {
        const selected = document.getElementById('selectedCategory');
        const value = selected.options[selected.selectedIndex].value;
        setSelectedCategory(value);
    };

    const printCategories=()=>
    {
        if(initialCategory!="All")
            return;

        return(
            <div className="displayCategories">
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
            </div>
        );
    };

    const convertStringDateTimezoneToClient=(stringDate)=>
    {
        const serverDate=new Date(stringDate+" +03:00"); //Server timezone
        return serverDate.toLocaleString('es-ES', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, 
            day: 'numeric',  month: '2-digit', year: 'numeric', hour: "2-digit", minute:"2-digit",
            hour12: false });
    };

    const printPosts=()=>
    {
        if(posts.length>0)
        {   
            return( 
                <div>
                    <div  className="posts">
                    {
                        posts.slice(0, numberOfVisiblePosts).map((post)=>
                        {
                            if(selectedCategory=="All" || post.Category==selectedCategory)
                            {
                                return(
                                    <div className="postGrid" 
                                        onClick={()=>{redirect(post.ID.toString(), post.Title)}}>
                                        <img className="postGridImage" src={post.CoverPhotoLink}/>
                                        <div className="postGridInformation">
                                            <h2 className="postGridTitle">{post.Title}</h2>
                                            <p className="postGridCategory">{"Category: "+post.Category}</p>
                                            <p className="postGridDate">{convertStringDateTimezoneToClient(post.PostDate)}</p>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    }{ifIsNecesaryHideMoreButton()}
                    </div>
                    
                    <div className="morePostsButtonArea">
                        <button className="morePostsButton" id="morePostsButton"
                            onClick={showMorePosts}>More</button>
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
            <div>{printCategories()}{printPosts()}</div>
            <Footer/>
        </div>
    );
} 