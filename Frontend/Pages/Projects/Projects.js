import React from 'react';
import {useHistory} from "react-router-dom";

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import "../Blog/Blog.css";

import { prefixURLBackend } from '../../PrefixURLBackend/PrefixURLBackend';

export default function Projects()
{
    const history=useHistory();
    function redirect(ID, title)
    {
        history.push("post/"+ID+"/"+title.replace(" ", "%20"));
    };

    const [posts, setPosts] = React.useState([]);
    const [numberOfVisiblePosts, setNumberOfVisiblePosts]=React.useState(4);

    React.useEffect(()=>{
        loadPosts();
    }, []);

    const loadPosts=()=>
    {
        fetch(prefixURLBackend+"/Project/ReadAll.php").then(information=>{ 
            information.text()
            .then(data=>{
                const json=JSON.parse(data);
                setPosts(json);
            })
        }).catch(e => alert('Database connection error...'));

        hideMoreButton();
    };

    const showMorePosts=()=>
    {
        hideMoreButton();
        setNumberOfVisiblePosts((val)=>val+4);
    };

    const hideMoreButton=()=>
    {
        if(posts.length<=numberOfVisiblePosts)
            document.getElementById('morePostsButton').style.display = 'none';
    };

    const printPosts=()=>
    {
        return(
            <div>
                <div  className="posts">
                {
                    posts.slice(0, numberOfVisiblePosts).map(post=>
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
            <div>{printPosts()}</div>
            <Footer/>
        </div>
    );
} 