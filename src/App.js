import "./App.css";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Widgets from "./components/Widgets";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Route path="/" component={Feed} />
        <Widgets />
      </div>
    </Router>
  );
}

export default App;
