import React from "react";
import VolTable from "./VolTable";
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";
import VolForm from "./VolForm";
import axios from "axios";

class Vol extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return <Switch>
                <Route exact path="/vol">
                    <div className="container my-4">
                        <h2 className="my-3 text-left"><i className="fas fa-angle-double-right"></i> Gestion des Vols</h2>
                        <Link className="btn btn-secondary my-3" to="/vol/nouveau">Ajouter un Vol</Link>
                        <VolTable domain = {this.props.domain}/>
                    </div>
                </Route>
                <Route exact path={["/vol/nouveau","/vol/modify/:num_vol"]}>
                    <div className="container my-4">
                        <VolForm handleFormChange={this.handleFormChange} domain = {this.props.domain}/>
                    </div>
                </Route>
                <Route exact path="">
                    <div className="container my-4">
                        <Link className="btn btn-secondary my-3" to="/vol">Retour</Link>
                    </div>
                </Route>
            </Switch>
    }
}

export default Vol