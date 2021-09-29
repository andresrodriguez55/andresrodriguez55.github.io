import {Switch, Route, HashRouter} from "react-router-dom";
import Blog from "./Pages/Blog/Blog";
import Post from "./Pages/Post/Post";
import { CategoryContext } from "./Tools/CategoryContext";
import About from "./Pages/About/About";

import "./App.css";

function App() 
{
  return (
    <HashRouter basename="/">
      <CategoryContext.Provider value={"All"}>
        <Route exact path="/" component={Blog}/>
      </CategoryContext.Provider>

      <CategoryContext.Provider value="Projects">
        <Route exact path="/projects" component={Blog}/>
      </CategoryContext.Provider>

      <Route exact path="/about" component={About}/>

      <Route path="/post/:id/:title" component={Post}/>
    </HashRouter>
  );
}

export default App;
