import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeMermaid from "rehype-mermaid";
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import SyntaxHighlighter from 'react-syntax-highlighter';
import railscasts  from 'react-syntax-highlighter/dist/esm/styles/hljs/railscasts';
import DateUtil from '../../../util/DateUtil';
import defaultImage from '../../../static/images/DefaultPostImage.jpg'
import style from './markdown-styles.module.css'; 
import './PostComponent.css'; 

const markdownCodeThemeComponent=(props)=>
{
    return (
        <SyntaxHighlighter style={railscasts} language={(props.className)?props.className.substring(9):""} 
            children={(props.children)?props.children:""}/>
    );
};

const PostComponent = ({ post }) => {
    return (
        <div className="PostArea">
            <div className='postInfo'>
                <img
                    alt=''
                    className='postImage'
                    src={post.coverPhotoLink}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = defaultImage;
                    }}
                />
                <div className='postHeaderText'>
                    <h1 className='postTitleX' align='center'>{post.title}</h1>
                    <h6 className='postDate' align='center'>{DateUtil.convertStringDateTimezoneToClient(post.date)}</h6>
                </div>
            </div>
            <br/>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw, remarkGfm, rehypeKatex, [rehypeMermaid, { strategy: "inline-svg" }]]}
                components={{ code: markdownCodeThemeComponent }}
                remarkPlugins={[remarkMath]}
                children={post.content}
                className={style.reactMarkDown}
            />
        </div>
    );
};

export default PostComponent;