import {Switch, Route, HashRouter} from "react-router-dom";
import Blog from "./Pages/Blog/Blog";
import Post from "./Pages/Post/Post";
import Projects from "./Pages/Projects/Projects";

import "./App.css";

function App() 
{
  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/" component={Blog}/>
        <Route path="/projects" component={Projects}/>
        <Route path="/post/:id/:title" component={Post}/>
      </Switch>
    </HashRouter>
  );
}

export default App;
