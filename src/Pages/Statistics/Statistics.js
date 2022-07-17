import React from 'react';

import {Pie, Line} from "react-chartjs-2";
import { DataGrid } from '@mui/x-data-grid';

import { prefixURLBackend } from '../../Tools/PrefixURLBackend/PrefixURLBackend';

import "./Statistics.css";
import { prefixURLFrontend } from '../../Tools/PrefixURLFrontend/PrefixURLFrontend';
import { FadeLoader } from 'react-spinners';

function getMonthName(number)
{
    switch(number)
    {
        case 1:
            return "January";
        case 2:
            return "Frebruary";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        default:
            return "December";
    };
};

function getLoopColorsByLength(len)
{
    const colors=["red", "blue", "yellow", "orange", "brown", "pink", "purple"];
    let temp=0;

    while(colors.length<len)
    {
        colors.push(colors[(temp++)%colors.length]);
    }

    return colors;
};

export default function Statistics()
{
    const [statistics, setStatistics] = React.useState(
        {
            countriesOfComments: [], 
            numberOfCommentsPerMonth: [],
            topCommentersNicks: [],
            topCommentedPosts: [],
        }); 

    const [loading, setLoading] = React.useState(true);

    React.useEffect(async()=>
    {
        await fetchStatistics();
    }, []);

    const fetchStatistics = async()=>
    {
        const urlToFetch = prefixURLBackend + "Statistics";
        await fetch(urlToFetch).then(async(response)=>
        {
            if(response.ok)
            {
                const data = await response.json();
                setStatistics(data);
            }
            else
                console.log(response.text);
        }).catch(e => alert(e));

        setLoading(false);
    };

    if(loading)
        return(
            <div style={{margin: "30px auto 120px auto", textAlign: "center"}}>
                <FadeLoader />
            </div>
        );

    return(
        <div >
            <center><h3>Top Commenters Nicks</h3></center>
            <div style={{ height: 370, width: '100%',  marginBottom:"40px",}}>
                <DataGrid 
                    columns={
                    [
                        {field:"nick", headerName:"Nick", flex:1, sortable:false, disableColumnMenu:true,},
                        {field:"commentsCount", headerName:"Comments Count", flex:1, sortable:false, disableColumnMenu:true,},
                    ]}
                
                    rows={statistics.topCommentersNicks}
                    getRowId={(row) => row.nick}
                    pageSize={5}
                />
            </div>

            <center><h3>Top Commented Posts</h3></center>
            <div style={{ height: 370, width: '100%',  marginBottom:"40px",}}>
                <DataGrid 
                    columns={
                    [
                        {field:"title", headerName:"Title", flex:1, sortable:false, disableColumnMenu:true, renderCell:(params)=>
                        (
                            <a style={{display: "inline-block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                textDecoration: "none"}
                                }
                                href={prefixURLFrontend + "post/" + params.id + "/" + params.value}>{params.value}</a>
                        )},
                        {field:"commentsCount", headerName:"Comments Count", flex:1, sortable:false, disableColumnMenu:true,},
                    ]}
                
                    rows={statistics.topCommentedPosts}
                    getRowId={(row) => row.id}
                    pageSize={5}
                />
            </div>

            <div className="chartArea">
                <Pie data=
                    {{
                        labels: statistics.countriesOfComments.map(info => info.country),
                        datasets: 
                        [{
                            backgroundColor: getLoopColorsByLength(statistics.countriesOfComments.length),
                            data: statistics.countriesOfComments.map(info => info.commentsCount), 
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
                        labels: statistics.numberOfCommentsPerMonth.map(info => getMonthName(info.commentsMonth)),
                        datasets: 
                        [{
                            backgroundColor: "rgba(75,192,192,0.2)",
                            data: statistics.numberOfCommentsPerMonth.map(info => info.commentsCount), 
                            pointRadius: 8
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