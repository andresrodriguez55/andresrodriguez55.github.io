import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import ContentAbout from "./ContentAbout.md";
import Header from '../../Tools/Header/Header';
import Footer from '../../Tools/Footer/Footer';
import style from "./markdown-styles.module.css";

export default function About()
{
    const [markdown, setMarkdown]=useState("");
    fetch(ContentAbout).then(content => content.text()).then(text => setMarkdown(text));

    return(
        <div>
        <Header/>
        <ReactMarkdown children={markdown} rehypePlugins={[rehypeRaw]} className={style.reactMarkDown}/>
        <Footer/>
        </div>
    );
}