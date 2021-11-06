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

            case "suscribe":
                const userEmail=prompt("Please enter the email to which you want to receive notifications about new posts:");
        
                const IP=await fetch("https://api.db-ip.com/v2/free/self", {method:"GET"}).then
                (
                    async(information)=> await information.json().then
                    ( 
                        data=>{ return data.ipAddress })
                    ).catch(e=>alert("Fatal error...")
                );

                const formData = new FormData();
                formData.append("Email", userEmail);
                formData.append("IP", IP);

                await fetch((prefixURLBackend+"SuscribedEmails/PostEmail.php"),
                {
                    method: "POST",
                    body: formData
                }).then(async(response)=>{await response.text()
                .then((result)=>
                {
                    alert(result);
                })});       

                break;

            case "admin" :
                history.push("/admin");
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
                            <span className="headerCategoryFont" onClick={()=>{redirect("suscribe")}}>
                                Suscribe
                            </span>
                        </div>
                    </li>

                    <li>
                        <div className="headerCategoryArea">
                            <span className="headerCategoryFont" onClick={()=>{redirect("admin")}}>
                                Admin
                            </span>
                        </div>
                    </li>
                </ul>
         
            </div>

            <div className="horizontalLine"/>

        </div>
    );
}   