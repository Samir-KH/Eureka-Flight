import React from "react";
import PiloteTable from "./PiloteTable";
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";
import PiloteForm from "./PiloteForm";
import axios from "axios";

class Pilote extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return <Switch>
                <Route exact path="/pilote">
                    <div className="container my-4">
                        <h2 className="my-3 text-left"><i className="fas fa-angle-double-right"></i> Gestion des Pilotes</h2>
                        <Link className="btn btn-secondary my-3" to="/pilote/nouveau">Ajouter un Pilote</Link>
                        <PiloteTable domain = {this.props.domain}/>
                    </div>
                </Route>
                <Route exact path={["/pilote/nouveau","/pilote/modify/:num_pilote"]}>
                    <div className="container my-4">
                        <PiloteForm handleFormChange={this.handleFormChange} domain = {this.props.domain}/>
                    </div>
                </Route>
                <Route exact path="">
                    <div className="container my-4">
                        <Link className="btn btn-secondary my-3" to="/pilote">Retour</Link>
                    </div>
                </Route>
            </Switch>
    }
}

export default Pilote