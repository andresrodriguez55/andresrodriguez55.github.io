import "./Footer.css";

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

function Footer()
{
    return(
        <div>
            <div className="footer">
                <div className="footerSocialIconsArea">
                    <a href="https://github.com/andresrodriguez55" target="_blank"><i className="fa fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/andr%C3%A9s-arturo-rodr%C3%ADguez-calder%C3%B3n-623873197/" target="_blank"><i className="fa fa-linkedin"></i></a>
                </div>

                <div className="footerEmailArea">
                    <p className="footerEmailFont">andrescalderonn1995@gmail.com</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;