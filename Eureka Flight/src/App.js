import React from "react";
import Navbar from "./component/nav_bar";
import "./App.css";
import VLink from "./component/link";
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from "react-router-dom";
import Avion from "./component/Avion/Avion"
import Pilote from "./component/Pilote/Pilote"
import Vol from "./component/Vol/Vol"
import axios from "axios";
class App extends React.Component {
  constructor(props){
    super(props)
    this.axios = axios
    this.domain = "http://localhost:8080/great_team"
  }
  render() {
    return <div>
      <Router>
        <Navbar>
          <VLink><Link to="/avion" ><i className="fas fa-plane"></i> Avion</Link></VLink>
          <VLink><Link to="/pilote"><i className="fas fa-user-tie"></i> Pilote</Link></VLink>
          <VLink><Link to="/vol"><i className="fas fa-plane-departure"></i> Vol</Link></VLink>
        </Navbar>
        <Switch>
          <Route path='/avion'>
            <Avion domain={this.domain} axios ={this.axios} />
          </Route>
          <Route path='/pilote'>
            <Pilote domain={this.domain} />
          </Route>
          <Route path='/vol'>
            <Vol domain={this.domain} />
          </Route>
          <Route exact path="/">
            <Redirect to="/avion" />
          </Route>
        </Switch>
      </Router>
    </div>
  }
}

export default App;