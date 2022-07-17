import {Route, HashRouter} from "react-router-dom";
import Blog from "./Pages/Blog/Blog";
import Post from "./Pages/Post/Post";
import About from "./Pages/About/About";
import Statistics from "./Pages/Statistics/Statistics";
import Login from "./Pages/Admin/Login";
import Admin from "./Pages/Admin/Admin";
import Unsubscribe from "./Pages/Unsubscribe/Unsubscribe";

import Header from "./Tools/Header/Header";
import Footer from "./Tools/Footer/Footer";

import "./App.css";

function App() 
{
  return (
  <div className="mainScreen">
    <HashRouter >
      <Header/>
      
      <Route exact path="/" component={Blog} />
      <Route exact path="/projects" component={Blog}/>
      <Route exact path="/about" component={About}/>
      <Route path="/post/:id/:title" component={Post}/>
      <Route exact path="/statistics" component={Statistics}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/admin" component={Admin}/>
      <Route exact path="/unsubscribe/:email" component={Unsubscribe}/>

      <Footer/>
    </HashRouter>
  </div>
  );
}

export default App;
