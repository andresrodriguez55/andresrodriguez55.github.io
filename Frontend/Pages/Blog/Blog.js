import React from 'react';
import {useHistory, useLocation} from "react-router-dom";

import Header from '../../Tools/Header/Header';
import Footer from '../../Tools/Footer/Footer';
import "./Blog.css";

import { prefixURLBackend } from '../../PrefixURLBackend/PrefixURLBackend';

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
    const [numberOfVisiblePosts, setNumberOfVisiblePosts]=React.useState(4);

    React.useEffect(()=>
    {
        loadPosts();
        if(initialCategory=="All")
            loadCategories();
    }, []);

    const loadCategories=()=>
    {
        const URLToFetch=prefixURLBackend+"/Category/ReadCategoriesOfPosts.php";

        fetch(URLToFetch).then((information)=>
        { 
            information.text()
            .then(data=>{
                const json=JSON.parse(data);
                setCategories(json);
            })
        }).catch(e => alert('Database connection error...'));
    };

    const loadPosts=()=>
    {
        let URLToFetch=prefixURLBackend+"/Post/ReadByCategory.php"+
            ( (selectedCategory=="All")?"":("?Category="+selectedCategory) );

        fetch(URLToFetch).then((information)=>
        { 
            information.text()
            .then(data=>{
                const json=JSON.parse(data);
                setPosts(json);
            })
        }).catch(e => alert('Database connection error...'));

        ifIsNecesaryHideMoreButton();
    };

    const showMorePosts=()=>
    {
        ifIsNecesaryHideMoreButton();
        setNumberOfVisiblePosts((val)=>val+4);
    };

    const ifIsNecesaryHideMoreButton=()=>
    {
        if(posts.length<=numberOfVisiblePosts)
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
            <div class="displayCategories">
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

    const printPosts=()=>
    {
        return(
            <div>
                <div  className="posts">
                {
                    posts.slice(0, numberOfVisiblePosts).map(post=>
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
                                        <p className="postGridDate">{post.PostDate}</p>
                                    </div>
                                </div>
                            );
                        }
                    })
                }
                </div>
                
                <div className="morePostsButtonArea">
                    <button className="morePostsButton" id="morePostsButton"
                        onClick={showMorePosts}>More</button>
                </div>
            </div>
        );
    };

    return(
        <div>
            <Header/>
            <div>{printCategories()}{printPosts()}</div>
            <Footer/>
        </div>
    );
} 