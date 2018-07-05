import React from 'react';
import './App.css';
import Home from './containers/Home';
import 'typeface-roboto';
import Header from './constants/header';
import { Switch, Route } from 'react-router-dom';
import AddPost from './containers/AddPost';
import PostDetails from './containers/PostDetails';
import EditComment from './containers/EditComment';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addPost" component={AddPost} />
        <Route exact path="/:category/" component={Home} />
        <Route exact path="/editPost/:postId" component={AddPost} />
        <Route exact path="/editComment/:commentId" component={EditComment} />
        <Route exact path="/:category/:postId" component={PostDetails} />
      </Switch>
    </div>
  );
};

export default App;
