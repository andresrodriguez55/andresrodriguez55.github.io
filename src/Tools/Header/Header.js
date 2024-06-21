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
                history.push("/projects/0");
                break;

            case "about":
                history.push("/about");
                break;

            case "statistics" :
                history.push("/statistics");
                break;  

            case "resume" :
                history.push("/resume");
                break;  
        }   
    };

    return (
        <div >
            <div className="headerArea">
                <div className="headerTitleArea">
                    <span className="title">
                        {"Andrés \nArturo \nRodríguez \nCalderón"}
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
                            <span className="headerCategoryFont" onClick={()=>{redirect("resume")}}>
                                CV 
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
     
                    <li>
                        <div className="headerCategoryArea">
                            <span className="headerCategoryFont" onClick={()=>{redirect("about")}}>
                                About
                            </span>
                        </div>
                    </li>
                </ul>
         
            </div>

            <div className="horizontalLine"/>
        </div>
    );
}   