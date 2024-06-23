import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Blog from './pages/blog/Blog';
import Post from './pages/post/Post';
import Resume from './pages/resume/Resume';
import About from './pages/about/About';
import Statistics from './pages/statistics/Statistics';
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';
import Unsubscribe from './pages/unsubscribe/Unsubscribe';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import './App.css';

function App() {
    return (
        <div className="mainScreen">
            <HashRouter>
                <Header />
                
                <Route exact path="/" component={Blog} />
                <Route path="/post/:id/:title" component={Post} />
                <Route exact path="/:category/:page" component={Blog} />
                <Route exact path="/about" component={About} />
                <Route exact path="/resume" component={Resume} />
                <Route exact path="/statistics" component={Statistics} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/unsubscribe/:email" component={Unsubscribe} />

                <Footer />
            </HashRouter>
        </div>
    );
}

export default App;