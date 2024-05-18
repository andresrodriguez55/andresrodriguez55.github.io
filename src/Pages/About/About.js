import Player from '../../Tools/Spotify/Player';

import logo from './taza.jpg';

import "./About.css";
import SubscribeButton from '../../Tools/SubscribeButton/SubscribeButton';

export default function About()
{
    return(
        <div className="aboutArea">
            <img className="aboutPic" src={logo}/>
            <br/>
            <span >
                Welcome to my mind! This is my personal space. Here I write any experience, thought or thing that I have just learned.
                <br/><br/>
                I am a Spanish, I was born in 1999 and I study computer engineering at Ege University located in Turkey. I love to learn new things, work hard, play the guitar and socialize with foreigners.
                <br/><br/>
                I am a person who gives discipline to the fundamental theory of computer science, whether from expendable algorithms, whether they are data structures or optimization, to automata theory because the connection of each subject in any field is incredible.
                <br/><br/>
                I am focused on software development and backend. I like to know how to plan and develop optimal software for all kinds of applications.
                <br/><br/>
                Lately, in order to improve my knowledge about advanced algorithms and good software practices, I'm trying to learn the fundamental competitive algorithms and good software engineering practices.
            </span>
            <br/><br/>
            <hr/>
            <br/>
            <Player/>
            <br/>
            <span>
                Above you can see what I have heard or am listening to at the moment on spotify.
                <br/><br/>
                I love progressive metal, before preparing for university entrance exam I used to write prog metal instrumental songs in a totally amateur way, recording bass with VST using guitar as midi input with programs and recording drums with additional VSTs. I also leave here as a memory a song I composed from those times.
            </span>
            <br/><br/>
            <div>
                <iframe
                    width="100%"
                    height="150"
                    src={`https://www.youtube.com/embed/VVAu9IaMs9g`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />

                <iframe
                    src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/484066497&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"}
                    width="100%" 
                    height="150" 
                    scrolling="no" 
                    frameborder="no" 
                    allow="autoplay" 
                />

                <iframe
                    src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/677097894&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"}
                    width="100%" 
                    height="150" 
                    scrolling="no" 
                    frameborder="no" 
                    allow="autoplay" 
                />
            </div>  
            {
                SubscribeButton()
            }
        </div>
    );
}