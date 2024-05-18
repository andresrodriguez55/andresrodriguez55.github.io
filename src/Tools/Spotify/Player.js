import React from "react";
import querystring from "querystring";

import "./Player.css";
import { FadeLoader } from 'react-spinners';

export default function Player()
{
    const [isUserOffline, setIsUserOffline] = React.useState(false);
    const [songData, setSongData] = React.useState(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    React.useEffect(async()=>
    {
        const setPlayerData = async()=>
        {
            const token = await fetchToken();
            await fetchPlayer(token);
        };

        await setPlayerData();

        const fetchPlayerInfoPeriodically = setInterval(async()=>
        {
            await setPlayerData();
        }, 25000);

        ()=> clearInterval(fetchPlayerInfoPeriodically);
    }, []);

    const fetchToken = async() =>
    {
        const basic = Buffer.from(`${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`).toString("base64");
        let token = null;

        await fetch(process.env.REACT_APP_SPOTIFY_TOKEN_URL, {method: "POST", 
            headers: {Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded"}, 
            body: querystring.stringify({grant_type: "refresh_token", 
                refresh_token: process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN})}).then(async(response) =>
        {
            if(response.ok)
            {
                const json = await response.json();
                token = json.access_token;
            }
        }).catch(error => console.log(error));

        return token;
    };

    const fetchPlayer = async(token) =>
    {
        let isOffline = true;

        await fetch(process.env.REACT_APP_SPOTIFY_ONLINE_URL, {method: "GET", headers: {Authorization: `Bearer ${token}`}}).then(async(response) =>
        {
            if(response.ok)
            {
                const json = await response.json();
                isOffline = false;
                setIsUserOffline(false);
                setSongData(json.item);
                setIsPlaying(json.is_playing);
            }
        }).catch(error => console.log(error));

        if(isOffline)
        {
            await fetch(process.env.REACT_APP_SPOTIFY_OFFLINE_URL, {method: "GET", headers: {Authorization: `Bearer ${token}`}}).then(async(response) =>
            {
                if(response.ok)
                {
                    const json = await response.json();
                    setIsUserOffline(true);
                    setSongData(json.items[0].track);
                    setIsPlaying(false);
                }
            }).catch(error => console.log(error));
        }
    };

    if(songData == null)
    {
        return(
            <div style={{margin: "30px 50px 120px auto", textAlign: "center"}}>
                <FadeLoader/>
            </div>
        );
    }

    else if(!isUserOffline)
    {
        return (
            <div className="spotifyPlayer" >                    
                <a href={songData.external_urls.spotify} target="_blank" style={{textDecoration: "none", color: "green"}}>
                    <img className="spotifyPlayerImage" src={songData.album.images[0].url} />
                </a>
                <div className="spotifyPlayerText">
                    <a href="https://open.spotify.com/user/wxcec8jt9ngo2fokmmwiiddm2?si=4e241563d3114295" 
                        target="_blank" style={{textDecoration: "none", color: "green"}}>
                        <i className="fab fa-spotify" style={{marginTop: "5px", fontSize: "26px", color:"green"}}/>
                        <p className="spotifyPlayerSongName">{songData.name}</p>
                        <p className="spotifyPlayerSongArtist">{songData.artists[0].name}</p>
                        <p className="spotifyPlayerSongStatus">{isPlaying ? "Playing" : "Paused"}</p>
                    </a>
                </div>
            </div>
        );
    }

    else
    {
        return (
            <div className="spotifyPlayer" >  
                <a href={songData.external_urls.spotify} target="_blank" style={{textDecoration: "none", color: "green"}}>               
                    <img className="spotifyPlayerImage" src={songData.album.images[0].url} />
                </a>   
                <div className="spotifyPlayerText">
                    <a href="https://open.spotify.com/user/wxcec8jt9ngo2fokmmwiiddm2?si=4e241563d3114295" 
                        target="_blank" style={{textDecoration: "none", color: "green"}}>
                        <i className="fab fa-spotify" style={{marginTop: "5px", fontSize: "26px", color:"green"}}/>
                        <p className="spotifyPlayerSongName">{songData.name}</p>
                        <p className="spotifyPlayerSongArtist">{songData.artists[0].name}</p>
                        <p className="spotifyPlayerSongStatus">{"Offline"}</p>
                    </a>
                </div>
            </div>
        );
    }
}
