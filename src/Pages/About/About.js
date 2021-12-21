import Header from '../../Tools/Header/Header';
import Footer from '../../Tools/Footer/Footer';

import logo from './taza.jpg';

import "./About.css";

export default function About()
{
    return(
        <div className="aboutScreen">
            <Header/>
            <div className="aboutArea">
                <img className="aboutPic" src={logo}/>
                <br/>
                <span >
                    Welcome to my mind! This is my personal space. Here I write any experience, thought or thing that I have just learned.
                    <br/>
                    <br/>
                    I am a Spanish, I was born in 1999 and I study computer engineering at Ege University located in Turkey. I love to learn new things, work hard, play the guitar and socialize with foreigners.
                </span>
            </div>
            <Footer/>
        </div>
    );
}