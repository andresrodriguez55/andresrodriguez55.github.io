import React from 'react';

import {Pie, Line} from "react-chartjs-2"

import { prefixURLBackend } from '../../Tools/PrefixURLBackend/PrefixURLBackend';

import PanelAdmin from "../PanelAdmin/PanelAdmin"

import "./Admin.css"

export default function Admin()
{
    const [commentsCountries, setCommentsCountries]=React.useState([]);
    const [commentsCountriesCount, setCommentsCountriesCount]=React.useState([]);
    const [commentsDate, setCommentsDate]=React.useState([]);
    const [commentsDateCount, setCommentsDateCount]=React.useState([]);

    const [user, setUser]=React.useState({});
    const [isSessionActive, setIsSessionActive]=React.useState(false);

    React.useEffect(()=>
    {
        loadCommentsCountriesInfo();
        loadCommentsMonthsInfo();
    }, []);

    const loadCommentsCountriesInfo=()=>
    {
        const tempCommentsCountries=[];
        const tempCommentsCountriesCount=[];

        const URLToFetch=prefixURLBackend+"UserComment/ReadCountOfCommentsByCountries.php";

        fetch(URLToFetch).then((information)=>
        { 
            information.text()
            .then(data=>
            {
                const json=JSON.parse(data);
                json.map(row=>
                {
                    tempCommentsCountries.push(row.Country);
                    tempCommentsCountriesCount.push(row.CommentsCount);
                })

                setCommentsCountries(tempCommentsCountries);
                setCommentsCountriesCount(tempCommentsCountriesCount);
            })
        }).catch(e => alert('Database connection error...'));
    };

    function getMonthName(number)
    {
        switch(number)
        {
            case "1":
                return "January";
            case "2":
                return "Frebruary";
            case "3":
                return "March";
            case "4":
                return "April";
            case "5":
                return "May";
            case "6":
                return "June";
            case "7":
                return "July";
            case "8":
                return "August";
            case "9":
                return "September";
            case "10":
                return "October";
            case "11":
                return "November";
            default:
                return "December";
        };
    };

    const loadCommentsMonthsInfo=()=>
    {
        const tempCommentsMonths=[];
        const tempCommentsMonthsCount=[];

        const URLToFetch=prefixURLBackend+"UserComment/ReadCountOfCommentsByMonths.php";

        fetch(URLToFetch).then((information)=>
        { 
            information.text()
            .then(data=>
            {
                const json=JSON.parse(data);
                json.map(row=>
                {
                    tempCommentsMonths.push(getMonthName(row.CommentsMonth));
                    tempCommentsMonthsCount.push(row.CommentsCount);
                })

                setCommentsDate(tempCommentsMonths);
                setCommentsDateCount(tempCommentsMonthsCount);
            })
        }).catch(e => alert('Database connection error...'));
    };

    function getLoopColorsByLength(len)
    {
        const colors=["red", "blue", "yellow", "orange", "brown", "pink"];
        let temp=0;

        while(colors.length<len)
        {
            colors.push(colors[(temp++)%colors.length]);
        }

        return colors;
    };

    const submit=(e)=>
    {
        e.preventDefault();

        const formData = new FormData();
        formData.append("Username", document.getElementById("Username").value);
        formData.append("Password", document.getElementById("Password").value);

        fetch((prefixURLBackend+"Admin/ReadUserExist.php"),
        {
            method: "POST",
            'Content-Type': "application/json",
            body: formData
        }).then((response)=>{response.text()
        .then((result)=>
        {
            if(result!="")
                alert(result);
            else
            {
                setUser({
                    Username: document.getElementById("Username").value,
                    Password: document.getElementById("Password").value
                });
                setIsSessionActive(true);
            }
        })});      
    };

    if(isSessionActive==false)
    {
        return(
            <div className="loginScreen">
                <form className="loginForm" onSubmit={(e)=>submit(e)}>
                    <h1>Admin Panel</h1>
                    <input className="usernameInput" name="Username" id="Username" 
                            type="password" placeholder="Username" 
                            autocomplete="off"/>
    
                    <input className="passwordInput" name="Password" id="Password" 
                            type="password" placeholder="Password" 
                            autocomplete="off"/>
    
                    <input className="loginPostButton" name="loginSubmit" id="loginSubmit" 
                                                type="submit" value="Login" />   
                </form>
    
                <h1 align="center">Statistics</h1>
    
                <div className="chartArea">
                    <Pie data=
                        {{
                            labels: commentsCountries,
                            datasets: 
                            [{
                                backgroundColor: getLoopColorsByLength(commentsCountriesCount.length),
                                data: commentsCountriesCount, 
                            }]
                        }} 
                        
                        options=
                        {{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins:
                            {
                                legend:{display:false},
                                title:{text:"Countries of Comments", display:true}
                            }
                        }}
                    height={290}/>
                </div> 
    
                <div className="chartArea">
                    <Line data=
                        {{
                            labels: commentsDate,
                            datasets: 
                            [{
                                backgroundColor: "rgba(75,192,192,0.2)",
                                data: commentsDateCount, 
                            }]
                        }} 
                        
                        options=
                        {{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins:
                            {
                                legend:{display:false},
                                title:{text:"Months of Comments Counts", display:true}
                            }
                        }}
                    height={290}/>
                </div>
            </div>
        );
    }
    
    else
    {
        return(
            <PanelAdmin user={user} />
        );
    }
}