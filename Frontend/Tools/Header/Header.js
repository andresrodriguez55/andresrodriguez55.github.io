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
        <div>
            <div className="headerArea">
                <div className="headerTitleArea">
                    <h1 className="title">
                        {"Andres \nArturo \nRodriguez \nCalderon"}
                    </h1>
                </div>

                <div className="verticalLine"/>

                <div className="headerCategoriesArea">
                    <ul className="listHeaderCategories">
                        <li>
                            <div className="headerCategoryArea">
                                <p className="headerCategoryFont" onClick={()=>{redirect("blog")}}>
                                    Blog
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="headerCategoryArea">
                                <p className="headerCategoryFont" onClick={()=>{redirect("projects")}}>
                                    Projects
                                </p>
                            </div>

                            <div className="headerCategoryArea">
                                <p className="headerCategoryFont" onClick={()=>{redirect("about")}}>
                                    About
                                </p>
                            </div>
                        </li>

                       
                    </ul>
                </div>
            </div>

            <div className="horizontalLine"/>

        </div>
    );
}   