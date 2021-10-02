import {useHistory} from "react-router-dom";

import "./Header.css"

export default function Header() 
{
    const history=useHistory();

    function redirect(category)
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

                <img className="headerImage" src="https://drive.google.com/uc?id=1pgByDR1LKavmj_hHA1PcPvfiv5CxY2w1"/>

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
                </ul>
         
            </div>

            <div className="horizontalLine"/>

        </div>
    );
}   