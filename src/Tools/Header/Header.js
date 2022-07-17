import {useHistory} from "react-router-dom";

import "./Header.css"
import logo from '../../Tools/Images/personAndGuitar.jpg';

import { prefixURLBackend } from '../PrefixURLBackend/PrefixURLBackend';

export default function Header() 
{
    const history=useHistory();

    async function redirect(category)
    {
        switch(category)
        {
            case "blog":
                history.push("");
                break;

            case "projects":
                history.push("/projects");
                break;

            case "about":
                history.push("/about");
                break;

            case "subscribe":
                const email=prompt("Please enter the email to which you want to receive notifications about new posts:");

                if(email==null)
                    return;

                const subscription = {Email: email};

                const urlToFetch = prefixURLBackend + "SuscribedEmail";
                await fetch((urlToFetch), {method: "POST", headers: {'Content-Type': "application/json"},
                    body: JSON.stringify(subscription) }).then(async(response)=>
                {
                    if(response.ok)
                    {
                        alert('Subscribed!');
                    }
                    else
                        alert(await response.text());
                }).catch(e => alert(e));     

                break;

            case "statistics" :
                history.push("/statistics");
                break;  
        }   
    };

    return (
        <div >
            <div className="headerArea">
                <div className="headerTitleArea">
                    <span className="title">
                        {"Andres \nArturo \nRodriguez \nCalderon"}
                    </span>
                </div>

                <div className="verticalLine"/>

                <img className="headerImage" src={logo}/>

                <ul className="listHeaderCategories">
                    <li>
                        <div className="headerCategoryArea">
                            <span className="headerCategoryFont" onClick={()=>{redirect("blog")}}>
                                Blog
                            </span>
                        </div>
                    </li>

                    <li>
                        <div className="headerCategoryArea">
                            <span className="headerCategoryFont" onClick={()=>{redirect("projects")}}>
                                Projects 
                            </span>
                        </div>
                    </li>
     
                    <li>
                        <div className="headerCategoryArea">
                            <span className="headerCategoryFont" onClick={()=>{redirect("about")}}>
                                About
                            </span>
                        </div>
                    </li>

                    <li>
                        <div className="headerCategoryArea">
                            <span className="headerCategoryFont" onClick={()=>{redirect("subscribe")}}>
                                Subscribe
                            </span>
                        </div>
                    </li>

                    <li>
                        <div className="headerCategoryArea">
                            <span className="headerCategoryFont" onClick={()=>{redirect("statistics")}}>
                                Statistics
                            </span>
                        </div>
                    </li>
                </ul>
         
            </div>

            <div className="horizontalLine"/>
        </div>
    );
}   