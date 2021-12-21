import {Route, HashRouter} from "react-router-dom";
import Blog from "./Pages/Blog/Blog";
import Post from "./Pages/Post/Post";
import About from "./Pages/About/About";
import Admin from "./Pages/Admin/Admin";

import "./App.css";

function App() 
{
  return (
    <HashRouter basename="/">
      <Route exact path="/" component={Blog} />
      <Route exact path="/projects" component={Blog}/>
      <Route exact path="/about" component={About}/>
      <Route path="/post/:id/:title" component={Post}/>

      <Route exact path="/admin" component={Admin}/>
    </HashRouter>
  );
}

export default App;
