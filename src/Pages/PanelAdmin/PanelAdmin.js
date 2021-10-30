import React from 'react';

import { prefixURLBackend } from '../../Tools/PrefixURLBackend/PrefixURLBackend';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import SyntaxHighlighter from 'react-syntax-highlighter';
import  railscasts  from 'react-syntax-highlighter/dist/esm/styles/hljs/railscasts';
import remarkGfm from 'remark-gfm';

import "./PanelAdmin.css"

export default function PanelAdmin({user})
{
    const [userComments, setUserComments] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [posts, setPosts] = React.useState([]);

    const [newPostContent, setNewPostContent] = React.useState("");

    React.useEffect(async()=>
    {
        await loadCategories();
        await loadUserComments();
        await loadPosts();
    }, []);

    const loadCategories=async()=>
    {
        const URLToFetch=prefixURLBackend+"/Admin/ReadCategoriesInfo.php";

        await fetch(URLToFetch).then(async(information)=>
        { 
            await information.text()
            .then(data=>{
                const json=JSON.parse(data);
                setCategories(json);
            })
        }).catch(e => alert('Database connection error...'));
    };

    const loadUserComments=async()=>
    {
        const URLToFetch=prefixURLBackend+"/Admin/ReadUserCommentsInfo.php";

        await fetch(URLToFetch).then(async(information)=>
        { 
            await information.text()
            .then(data=>{
                const json=JSON.parse(data);
                setUserComments(json);
            })
        }).catch(e => alert('Database connection error...'));
    };

    const loadPosts=async()=>
    {
        const URLToFetch=prefixURLBackend+"/Admin/ReadPostsInfo.php";

        await fetch(URLToFetch).then(async(information)=>
        { 
            await information.text()
            .then(data=>{
                const json=JSON.parse(data);
                setPosts(json);
            })
        }).catch(e => alert('Database connection error...'));
    };

    const updatedComment=async(newData)=>
    {
        const row=newData.row;

        if(row)
            row[newData.field]=newData.value;
        else 
        {    
            loadUserComments();
            return;
        }

        const data = new FormData();
        data.append("Username", user.Username);
        data.append("Password", user.Password);
        data.append("ID", parseInt(row.id));
        data.append("Nick", row.UserCommentNick);
        data.append("Content", row.UserCommentContent);

        await fetch((prefixURLBackend+"Admin/UpdateComment.php"),
        {
            method: "POST",
            'Content-Type': "application/json",
            body: data
        }).then(async(response)=>{await response.text()
        .then((result)=>
        {
            if(result!="")
                alert(result);
        })});  

        loadUserComments();
    };

    const deleteUserComment=async(id)=>
    {
        const data = new FormData();
        data.append("Username", user.Username);
        data.append("Password", user.Password);
        data.append("ID", id);

        await fetch((prefixURLBackend+"Admin/DeleteComment.php"),
        {
            method: "POST",
            'Content-Type': "application/json",
            body: data
        }).then(async(response)=>{await response.text()
        .then((result)=>
        {
            if(result!="")
                alert(result);
        })});      

        loadPosts();
        loadUserComments();
    };

    const commentsSection=()=>
    {
        return(
            <div style={{ height: 320, width: '100%',  marginBottom:"40px",}}>
                <DataGrid 
                    columns={
                    [
                        {field:"PostTitle", headerName:"Title of Post", sortable:false, disableColumnMenu:true, flex:1},
                        {field:"UserCommentNick", headerName:"Nick of User", sortable:false, disableColumnMenu:true, editable:true, flex:1},
                        {field:"UserCommentContent", headerName:"Content of Comment", sortable:false, disableColumnMenu:true,  editable:true, flex:1},
                        {field:"UserCountry", headerName:"Country", sortable:false, disableColumnMenu:true, flex:1},
                        {field:"CommentDate", headerName:"Date", sortable:false, disableColumnMenu:true, flex:1},
                        {field: "action", headerName:"Action", sortable:false, disableColumnMenu:true, flex:1,
                            renderCell: (info) => 
                            (
                                <Button
                                    style={{
                                    backgroundColor: "#e8605d",
                                    padding: "3px 35px",
                                    width:"100%"
                                    }}

                                    onClick={() => deleteUserComment(info.id)}
                                    variant="contained"
                                    type="submit">
                                    Delete
                                </Button>
                            )
                        }
                    ]}
                
                    rows={userComments}
                    pageSize={4}
                    onCellEditCommit={updatedComment}
                />
            </div>
        );
    };

    const updatedCategory=async(newData)=>
    {
        const row=newData.row;

        if(!row)
        {
            loadCategories();
            return;
        }

        const data = new FormData();
        data.append("Username", user.Username);
        data.append("Password", user.Password);
        data.append("CurrentNameOfCategory", row.NameOfCategory);
        data.append("NewNameOfCategory", newData.value);

        await fetch((prefixURLBackend+"Admin/UpdateCategory.php"),
        {
            method: "POST",
            'Content-Type': "application/json",
            body: data
        }).then(async(response)=>{await response.text()
        .then((result)=>
        {
            if(result!="")
                alert(result);
        })});  

        loadCategories();
    };

    const deleteCategory=async(nameOfCategory)=>
    {
        const data = new FormData();
        data.append("Username", user.Username);
        data.append("Password", user.Password);
        data.append("NameOfCategory", nameOfCategory);

        await fetch((prefixURLBackend+"Admin/DeleteCategory.php"),
        {
            method: "POST",
            'Content-Type': "application/json",
            body: data
        }).then(async(response)=>{await response.text()
        .then((result)=>
        {
            if(result!="")
                alert(result);
        })});      

        loadPosts();
        loadCategories();
    };

    const postCategory=async(nameOfCategory)=>
    {
        const data = new FormData();
        data.append("Username", user.Username);
        data.append("Password", user.Password);
        data.append("NameOfCategory", nameOfCategory);

        await fetch((prefixURLBackend+"Admin/PostCategory.php"),
        {
            method: "POST",
            'Content-Type': "application/json",
            body: data
        }).then(async(response)=>{await response.text()
        .then((result)=>
        {
            if(result!="")
                alert(result);
            else
                document.getElementById("NewCategory").value="";
        })});      

        loadCategories();
    };

    const categoriesSection=()=>
    {
        return(
            <div style={{ height: 320, width: '100%', marginBottom:"80px" }}>
                <DataGrid 
                    columns={
                    [
                        {field:"NameOfCategory", headerName:"Name", sortable:false, disableColumnMenu:true, editable:true, flex:1},
                        {field:"NumberOfPosts", headerName:"Number of Posts", sortable:false, disableColumnMenu:true, flex:1},
                        {field: "action", headerName:"Action", sortable:false, disableColumnMenu:true, flex:1,
                            renderCell: (info) => 
                            (
                                <Button
                                    style={{
                                    backgroundColor: "#e8605d",
                                    padding: "3px 35px",
                                    width:"100%"
                                    }}

                                    onClick={() => deleteCategory(info.id)}
                                    variant="contained"
                                    type="submit">
                                    Delete
                                </Button>
                            )
                        }
                    ]}
                    rows={categories}
                    pageSize={4}
                    onCellEditCommit={updatedCategory}/>

                    <label>New: </label>
                    <input type="text" id="NewCategory" />

                    <Button
                        style={{
                        backgroundColor: "#0c7d06",
                        width:"1%",
                        height: "25px",
                        padding: "3px 35px",
                        marginTop:"2px",
                        }}

                        onClick={() => postCategory(document.getElementById("NewCategory").value)}
                        variant="contained"
                        type="submit">
                        POST
                    </Button>
            </div>
        );
    };

    const deletePost=async(postID)=>
    {
        const data = new FormData();
        data.append("Username", user.Username);
        data.append("Password", user.Password);
        data.append("ID", postID);

        await fetch((prefixURLBackend+"Admin/DeletePost.php"),
        {
            method: "POST",
            'Content-Type': "application/json",
            body: data
        }).then(async(response)=>{await response.text()
        .then((result)=>
        {
            if(result!="")
                alert(result);
        })});      

        loadCategories();
        loadPosts();
    };

    const setNewPostInfoWithExistingPostInfo=(post)=>
    {
        setNewPostID(post.id);
        document.getElementById("PostTitle").value=post.PostTitle;
        document.getElementById("PostContent").value=post.PostContent;
        setNewPostContent(post.PostContent);
        document.getElementById("PostDate").value=post.PostDate.replace(" ", "T");
        document.getElementById("PostCategory").value=post.PostCategory;
        document.getElementById("PostCoverLink").value=post.PostCoverPhotoLink;
    };

    const setNewPostID=(newID)=>
    {
        document.getElementById("PostID").value=newID;
    };

    const postsSection=()=>
    {
        return(
            <div>
                <div style={{ height: 320, width: '100%', marginBottom:"20px", }}>
                    <DataGrid 
                        columns={
                        [
                            {field:"PostTitle", headerName:"Title", sortable:false, disableColumnMenu:true, flex:1},
                            {field:"PostCategory", headerName:"Category", sortable:false, disableColumnMenu:true, flex:1},
                            {field:"PostDate", headerName:"Date", sortable:false, disableColumnMenu:true, flex:1},
                            {field:"NumberOfComments", headerName:"Number of Comments", sortable:false, disableColumnMenu:true, flex:1},
                            {field: "action", headerName:"Action", sortable:false, disableColumnMenu:true, flex:1,
                                renderCell: (info) => 
                                (
                                    <>
                                        <Button
                                            style={{
                                            backgroundColor: "#ffcc00",
                                            width:"48%",
                                            marginRight: "4%",
                                            padding: "3px 35px"
                                            }}

                                            onClick={() => setNewPostInfoWithExistingPostInfo(info.row)}
                                            variant="contained"
                                            type="submit">
                                            Edit
                                        </Button>

                                        <Button
                                            style={{
                                            backgroundColor: "#e8605d",
                                            width:"48%",
                                            padding: "3px 35px",
                                            }}

                                            onClick={() => deletePost(info.id)}
                                            variant="contained"
                                            type="submit">
                                            Delete
                                        </Button>
                                    </>
                                )
                            }
                        ]}
                        rows={posts}
                        pageSize={4}/>  
                </div>
                {newPostSection()}
            </div>
        );
    };

    const markdownCodeThemeComponent=(props)=>
    {
        return (
            <SyntaxHighlighter style={railscasts} language={(props.className)?props.className.substring(9):""} 
                children={(props.children)?props.children:""}/>
        );
    };

    const postOrUpdatePost=async()=>
    {
        if(!document.getElementById("PostID"))
            return;

        const data = new FormData();
        data.append("Username", user.Username);
        data.append("Password", user.Password);

        data.append("ID", parseInt(document.getElementById("PostID").value));
        data.append("Title", document.getElementById("PostTitle").value.replaceAll("\"", "\'"));
        data.append("Content", document.getElementById("PostContent").value.replaceAll("\"", "\'"));
        data.append("Category", document.getElementById("PostCategory").value);
        data.append("PostDate", document.getElementById("PostDate").value.replace("T", " ").replaceAll("-","."));
        data.append("CoverPhotoLink", document.getElementById("PostCoverLink").value);

        await fetch((prefixURLBackend+"Admin/PostOrUpdatePost.php"),
        {
            method: "POST",
            'Content-Type': "application/json",
            body: data
        }).then(async(response)=>{await response.text()
        .then((result)=>
        {
            if(result!="")
                alert(result);
            else
            {
                document.getElementById("PostID").value="";
                document.getElementById("PostTitle").value="";
                document.getElementById("PostContent").value="";
                document.getElementById("PostCoverLink").value="";
                setNewPostContent("");
            }
        })});      

        loadCategories();
        loadPosts();
    }

    const newPostSection=()=>
    {
        return(
            <div className="markdownEditor">
                <label >ID: </label>
                <input className="IDLabel" type="number" id="PostID" disabled/>
                <button onClick={()=>setNewPostID(posts.length)}>Set For New Post</button>
                <div className="break"/>

                <label>Title: </label>
                <input type="text" id="PostTitle" />
                <div className="break"/>

                <label>Date: </label>
                <input type="datetime-local" id="PostDate"/>
                <div className="break"/>

                <label>Category: </label>
                <select id="PostCategory" >
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

                <div className="break"/>

                <label>Cover Link: </label>
                <input type="text" id="PostCoverLink"/>
                <div className="break"/>

                <textarea className="textArea" id="PostContent" 
                    onKeyDown={(e)=>
                    {
                        if(e.keyCode == 9) 
                        { 
                            e.preventDefault();

                            const element=document.getElementById("PostContent");

                            const start = element.selectionStart;
                            const end = element.selectionEnd;

                            element.value = element.value.substring(0, start) + "\t" + element.value.substring(end);

                            element.selectionStart = element.selectionEnd = start + 1;
                        }
                    }}
                />
                
                <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm]} 
                    components={{code: markdownCodeThemeComponent}}
                    children={newPostContent} 
                    className={"markdown"} />
                <div className="break"/>

                <Button
                    style={{
                    backgroundColor: "#000000",
                    width:"6%",
                    padding: "3px 35px",
                    marginTop:"7px",
                    marginRight:"7px"
                    }}
                    onClick={()=>{setNewPostContent(document.getElementById("PostContent").value)}}
                    variant="contained"
                    type="submit">
                    Review
                </Button>
                <Button
                    style={{
                    backgroundColor: "#0c7d06",
                    width:"6%",
                    padding: "3px 35px",
                    marginTop:"7px",
                    }}

                    onClick={()=>postOrUpdatePost()}
                    variant="contained"
                    type="submit">
                    Post
                </Button>
            </div>
        );
    };

    return(
        <div className="adminScreen">
            {commentsSection()}
            {categoriesSection()}
            {postsSection()}
        </div>
    );
}