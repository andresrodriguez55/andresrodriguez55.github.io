import React from 'react';

import { prefixURLBackend } from '../../Tools/PrefixURLBackend/PrefixURLBackend';

import {Button, Stack} from '@mui/material';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import SyntaxHighlighter from 'react-syntax-highlighter';
import railscasts  from 'react-syntax-highlighter/dist/esm/styles/hljs/railscasts';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import { getToken, deleteToken } from '../../Tools/auth-helper';

import "./Admin.css";

function convertStringDateTimezoneToClient(stringDate)
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

export default function Admin()
{
    const [userComments, setUserComments] = React.useState([]);
    const [subscriptions, setSubscriptions] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [posts, setPosts] = React.useState([]);

    const [, forceUpdate] = React.useReducer(x => x + 1, 0);

    React.useEffect(async()=>
    {
        await fetchUserComments();
        await fetchSubscriptions();
        await fetchCategories();
        await fetchPosts();
    }, []);

    const APIheaders = {
        'Content-Type': "application/json",
        'Authorization': getToken()
    };

    const fetchUserComments = async()=>
    {
        const urlToFetch = prefixURLBackend + "UserComment";

        await fetch(urlToFetch, {"method": "GET", headers: APIheaders}).then(async(response)=>
        { 
            if(response.ok)
            {
                const json = await response.json();
                setUserComments(json);
            }
        }).catch(e => alert('Database connection error...'));
    };

    const fetchSubscriptions = async()=>
    {
        const urlToFetch = prefixURLBackend + "SuscribedEmail";

        await fetch(urlToFetch, {"method": "GET", headers: APIheaders}).then(async(response) =>
        { 
            if(response.ok)
            {
                const json = await response.json();
                setSubscriptions(json);
            }
        }).catch(e => alert(e));
    }

    const fetchCategories = async()=>
    {
        const urlToFetch = prefixURLBackend + "Category";

        await fetch(urlToFetch, {"method": "GET", headers: APIheaders}).then(async(response) =>
        { 
            await response.json().then(json => setCategories(json))
        }).catch(e => alert(e));
    };

    const fetchPosts = async()=>
    {
        const urlToFetch = prefixURLBackend + "Post";

        await fetch(urlToFetch, {"method": "GET", headers: APIheaders}).then(async(response)=>
        { 
            await response.json().then(json => setPosts(json))
        }).catch(e => alert('Database connection error...'));
    };

    const putComment= async(newData)=>
    {
        const row=newData.row;

        if(row)
            row[newData.field]=newData.value;

        const urlToFetch = prefixURLBackend + "UserComment";
        await fetch((urlToFetch),
        {
            method: "PUT",
            headers: APIheaders,
            'Content-Type': "application/json",
            body: JSON.stringify(row)
        }).then(async(response)=>
        {    
            if(!response.ok)
            {    
                alert("HTTP Code: " + response.status);

                //hacerlo manual proximamente
                fetchUserComments();
            }
        }).catch(e => alert(e));  
    };

    const deleteComment=async(id)=>
    {
        const urlToFetch = prefixURLBackend + "UserComment/" + id.toString();
        await fetch((urlToFetch),
        {
            method: "DELETE",
            headers: APIheaders,
        }).then(async(response)=>
        {
            if(!response.ok)
            {
                alert("HTTP Code: " + response.status);
            }
            else
            {
                //hacerlo manual proximamente
                fetchUserComments();
                fetchPosts();
            }
        }).catch(e => alert(e));      
    };

    const commentsSection=()=>
    {
        return(
            <div style={{ height: 585, width: '100%',  marginBottom:"40px",}}>
                <DataGrid 
                    columns={
                    [
                        {field:"postTitle", headerName:"Title of Post", flex:1, renderCell:(params)=>
                            (
                                <a style={{display: "inline-block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                    textDecoration: "none"}
                                    }
                                    href={"http://localhost:3001/#/" + "post/" + params.row.postId + "/" + params.value}>{params.value}</a>
                            )},
                        {field:"nick", headerName:"Nick", editable:true, flex:1},
                        {field:"content", headerName:"Content", editable:true, flex:1,},
                        {field:"email", headerName:"Email", editable:true, flex:1},
                        {field:"notifyReply", headerName:"Notify", editable:true, flex:0.4 },
                        {field:"country", headerName:"Country", flex:0.7},
                        {field:"commentDate", headerName:"Date", flex:1, 
                            renderCell: (data) => (convertStringDateTimezoneToClient(data.value))},
                        {field: "action", headerName:"Action", flex:1,
                            renderCell: (info) => 
                            (
                                <Button
                                    style={{
                                    backgroundColor: "#e8605d",
                                    padding: "3px 35px",
                                    width:"100%"
                                    }}

                                    onClick={() => deleteComment(info.id)}
                                    variant="contained"
                                    type="submit">
                                    Delete
                                </Button>
                            )
                        }
                    ]}
                
                    rows={userComments}
                    components={{
                        NoRowsOverlay: () => 
                            ( 
                                <Stack height="100%" alignItems="center" justifyContent="center">
                                    Session expired...
                                </Stack>
                            ),
                        Toolbar: GridToolbar 
                    }}
                    getRowId={(row) => row.id}
                    pageSize={8}
                    onCellEditCommit={putComment}
                />
            </div>
        );
    };

    const deleteSubscription=async(email)=>
    {
        const urlToFetch = prefixURLBackend + "SuscribedEmail/" + email;
        await fetch((urlToFetch),
        {
            method: "DELETE",
            headers: APIheaders,
        }).then(async(response)=>
        {
            if(!response.ok)
            {
                alert("HTTP Code: " + response.status);
            }
            else
            {
                //hacerlo manual proximamente
                fetchSubscriptions();
            }
        }).catch(e => alert(e));      
    };

    const subscriptionsSection = ()=>
    {
        return(
            <div style={{ height: 585, width: '100%',  marginBottom:"40px",}}>
                <DataGrid 
                    columns={
                    [
                        {field:"email", headerName:"Email", flex:1},
                        {field:"subscriptionDate", headerName:"Date", flex:1, 
                            renderCell: (data) => (convertStringDateTimezoneToClient(data.value))},
                        {field: "action", headerName:"Action", flex:1,
                            renderCell: (info) => 
                            (
                                <Button
                                    style={{
                                    backgroundColor: "#e8605d",
                                    padding: "3px 35px",
                                    width:"100%"
                                    }}

                                    onClick={() => deleteSubscription(info.id)}
                                    variant="contained"
                                    type="submit">
                                    Delete
                                </Button>
                            )
                        }
                    ]}
                
                    rows={subscriptions}
                    components={{
                        NoRowsOverlay: () => 
                            ( 
                                <Stack height="100%" alignItems="center" justifyContent="center">
                                    Session expired...
                                </Stack>
                            ),
                        Toolbar: GridToolbar 
                    }}
                    getRowId={(row) => row.email}
                    pageSize={8}
                />
            </div>
        );
    };

    const postCategory=async(nameOfCategory)=>
    {
        const urlToFetch = prefixURLBackend + "Category";
        await fetch((urlToFetch),
        {
            method: "POST",
            headers: APIheaders,
            body: "\""+nameOfCategory+"\"",
            'Content-Type': "application/json",
        }).then(async(response)=>
        {
            if(response.ok)
            {
                //hacer manualmente
                fetchCategories();
                document.getElementById("NewCategory").value="";
            }
            else
                alert("HTTP Code: " + response.status);
        }).catch(e => alert(e));
    };

    const deleteCategory=async(nameOfCategory)=>
    {
        const urlToFetch = prefixURLBackend + "Category/" + nameOfCategory;
        await fetch((urlToFetch),
        {
            method: "DELETE",
            headers: APIheaders,
        }).then(async(response)=>
        {
            if(!response.ok)
            {
                alert("HTTP Code: " + response.status);
            }
            else
            {
                //hacerlo manual proximamente
                fetchCategories();
                fetchPosts();
            }
        }).catch(e => alert(e));   
    };

    const categoriesSection=()=>
    {
        return(
            <div style={{ height: 370, width: '100%', marginBottom:"80px" }}>
                <DataGrid 
                    columns={
                    [
                        {field:"nameOfCategory", headerName:"Name", sortable:false, disableColumnMenu:true, editable:true, flex:1},
                        {field:"count", headerName:"Number of Posts", sortable:false, disableColumnMenu:true, flex:1},
                        {field: "action", headerName:"Action", sortable:false, disableColumnMenu:true, flex:1,
                            renderCell: (info) => 
                            (info.id == 'Projects' || info.id == 'Private') ? null : 
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
                    getRowId={(row) => row.nameOfCategory}
                    pageSize={4}
                    //onCellEditCommit={updatedCategory}
                    components={{Toolbar: GridToolbar}}
                    />

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

    const fetchPost=async(id)=>
    {
        const urlToFetch=prefixURLBackend + "Post/" + id.toString();

        await fetch(urlToFetch, {"method": "GET", headers: APIheaders}).then(async(response)=>
        { 
            if(response.ok)
            {
                await response.json().then(json =>
                { 
                    setWrittenPost(json);
                });
            }
            else
            {
                alert("HTTP Code: " + response.status);
            }
        }).catch(e => alert('Database connection error...'));
    };

    const postPost = async(post) =>
    {
        const urlToFetch = prefixURLBackend + "Post";
        await fetch((urlToFetch),
        {
            method: "POST",
            headers: APIheaders,
            body: JSON.stringify(post),
            'Content-Type': "application/json",
        }).then(async(response)=>
        {
            if(response.ok)
            {
                //hacer manualmente
                fetchCategories();
                fetchPosts();
                resetWrittenPost();
            }
            else if(response.status != 500)
                alert("HTTP Code: " + response.status);
            else 
                alert("Notifications error or server error!")
        }).catch(e => alert(e));
    };

    const putPost=async(post)=>
    {
        const urlToFetch = prefixURLBackend + "Post/" + post.id.toString();
        await fetch((urlToFetch),
        {
            method: "PUT",
            headers: APIheaders,
            body: JSON.stringify(post),
            'Content-Type': "application/json",
        }).then(async(response)=>
        {
            if(response.ok)
            {
                //hacer manualmente
                fetchCategories();
                fetchPosts();
                resetWrittenPost();
            }
            else
            {
                alert("HTTP Code: " + response.status);
            }
        }).catch(e => alert("a"));
    }

    const deletePost=async(id)=>
    {
        const urlToFetch = prefixURLBackend + "Post/" + id.toString();
        await fetch((urlToFetch),
        {
            method: "DELETE",
            headers: APIheaders,
        }).then(async(response)=>
        {
            if(!response.ok)
            {
                alert("HTTP Code: " + response.status);
            }
            else
            {
                //hacerlo manual proximamente
                fetchPosts();
                fetchCategories();
                fetchUserComments();
            }
        }).catch(e => alert(e)); 
    };

    const getWrittenPost = () =>
    {
        const post = 
        {
            id: document.getElementById("id").value,
            title: document.getElementById("title").value,
            content: document.getElementById("content").value,
            postDate: document.getElementById("postDate").value,
            category: document.getElementById("category").value,
            coverPhotoLink: document.getElementById("coverPhotoLink").value,
        };

        return post;
    }

    const setWrittenPost = (json) =>
    {
        document.getElementById("id").value=json.id;
        document.getElementById("title").value = json.title;
        document.getElementById("content").value = json.content;
        document.getElementById("postDate").value = json.postDate.replace(" ", "T");
        document.getElementById("category").value = json.category;
        document.getElementById("coverPhotoLink").value = json.coverPhotoLink;
    };

    const resetWrittenPost = () =>
    {
        document.getElementById("id").value = '';
        document.getElementById("title").value = '';
        document.getElementById("content").value = '';
        document.getElementById("postDate").value = '';
        document.getElementById("category").value = '';
        document.getElementById("coverPhotoLink").value = '';
    };

    const postsSection=()=>
    {
        return(
            <div>
                <div style={{ height: 570, width: '100%', marginBottom:"60px", }}>
                    <DataGrid 
                        columns={
                        [
                            {field:"title", headerName:"Title", sortable:false, disableColumnMenu:true, flex:1, 
                                renderCell:(params)=>
                                (
                                    <a style={{display: "inline-block", whiteSpace: "nowrap", overflow: "hidden", 
                                        textOverflow: "ellipsis", textDecoration: "none"}}
                                        href={"http://localhost:3001/#/" + "post/" + params.id + "/" + params.value}>
                                    {params.value}
                                    </a>
                                )},
                            {field:"category", headerName:"Category", sortable:false, disableColumnMenu:true, flex:1},
                            {field:"postDate", headerName:"Date", sortable:false, disableColumnMenu:true, flex:1,
                                renderCell: (data) => (convertStringDateTimezoneToClient(data.value))},
                            {field:"commentsCount", headerName:"Number of Comments", sortable:false, disableColumnMenu:true, flex:1},
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
                                            onClick={() => fetchPost(info.id)}
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
                        getRowId={(row) => row.id}
                        pageSize={8}
                        components={{Toolbar: GridToolbar}}
                        />  
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

    const newPostSection=()=>
    {
        return(
            <div className="markdownEditor">
                <label >ID: </label>
                <input className="IDLabel" type="number" id="id" disabled/>
                <button onClick={() => document.getElementById("id").value = null }>Set NULL For New Post</button>
                <div className="break"/>

                <label>Title: </label>
                <input type="text" id="title" />
                <div className="break"/>

                <label>Date: </label>
                <input type="datetime-local" id="postDate"/>
                <div className="break"/>

                <label>Category: </label>
                <select id="category" >
                {
                    categories.map( c=>
                    {
                        return(
                            <option value={c.nameOfCategory}>
                                {c.nameOfCategory}
                            </option>
                        );
                    })
                }
                </select>
                <div className="break"/>

                <label>Cover Link: </label>
                <input type="text" id="coverPhotoLink"/>
                <div className="break"/>

                <textarea className="textArea" id="content" 
                    onKeyDown={(e)=>
                    {
                        if(e.keyCode == 9) 
                        { 
                            e.preventDefault();

                            const element=document.getElementById("content");

                            const start = element.selectionStart;
                            const end = element.selectionEnd;

                            element.value = element.value.substring(0, start) + "\t" + element.value.substring(end);

                            element.selectionStart = element.selectionEnd = start + 1;
                        }
                    }}
                />
                <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm, rehypeKatex]} 
                    components={{code: markdownCodeThemeComponent}} 
                    remarkPlugins={[remarkMath]}
                    children={document.getElementById("content")?.value} 
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
                    onClick={()=>{forceUpdate();}}
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
                    onClick={()=>
                    {
                        if(document.getElementById("id").value == '')
                            postPost(getWrittenPost()); 
                        else
                            putPost(getWrittenPost()); 
                    }}
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
            {subscriptionsSection()}
            {categoriesSection()}
            {postsSection()}
        </div>
    );
}