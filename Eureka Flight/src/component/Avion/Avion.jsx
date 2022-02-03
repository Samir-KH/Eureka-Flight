import React from "react";
import AvionTable from "./AvionTable";
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";
import AvionForm from "./AvionForm";


class Avion extends React.Component {
    constructor(props){
        super(props)
        this.axios = props.axios
    }
    render() {
        return <Switch>
                <Route exact path="/avion">
                    <div className="container my-4">
                        <h2 className="my-3 text-left"><i className="fas fa-angle-double-right"></i> Gestion des Avions</h2>
                        <Link className="btn btn-secondary my-3" to="/avion/nouveau">Ajouter une Avion</Link>
                        <AvionTable axios={this.axios} domain = {this.props.domain}/>
                    </div>
                </Route>
                <Route exact path={["/avion/nouveau","/avion/modify/:num_avion"]}>
                    <div className="container my-4">
                        <AvionForm axios={this.axios} domain = {this.props.domain} handleFormChange={this.handleFormChange}/>
                    </div>
                </Route>
            </Switch>
    }
}

export default Avion