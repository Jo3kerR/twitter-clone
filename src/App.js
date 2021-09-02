import "./App.css";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Widgets from "./components/Widgets";
import PostDetail from "./components/PostDetail";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/post/:id" exact component={PostDetail} />
        </Switch>
        <Widgets />
      </div>
    </Router>
  );
}

export default App;
