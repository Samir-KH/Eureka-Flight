import React from "react";
import { Link, matchPath, Redirect } from "react-router-dom";
import axios from "axios";


class PiloteForm extends React.Component {
    constructor(props) {
        super(props)
        this.domain = this.props.domain
        const path = window.location.pathname
        if (path == "/pilote/nouveau") {
            this.purpse = "Ajouter"
            this.title = "Ajout d'un nouvelle pilote"
        } else if (path.indexOf("/pilote/modify") == 0) {
            this.purpse = "Modifier"
        }
        let pilote = {
            numPilote: null,
            nomCompletPilote: "",
            adressePilote: "",
            dateNaissance: "2000-01-01",
            salaire: 0,
        }
        this.state = { pilote: pilote }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleadressePiloteChange = this.handleadressePiloteChange.bind(this)
        this.handleBirthDayChange = this.handleBirthDayChange.bind(this)
        this.handleSalaryChange = this.handleSalaryChange.bind(this)
        this.Handlesubmit = this.Handlesubmit.bind(this)
    }
    getNumPiloteFromUrl(path) {
        const matchPathUrl = "^/pilote/modify/[0-9]+$"
        const test = path.match(matchPathUrl)
        if (test != null) {
            let data = path.match("/[0-9]+$")
            return data[0].slice(1)
        } else return null
    }

    componentDidMount() {
        const path = window.location.pathname
        if (this.purpse == "Modifier") {
            let numPilote = this.getNumPiloteFromUrl(path)
            if (numPilote != null) {
                axios.get(this.domain + "/pilote/" + numPilote).then(
                    (response) => {
                        this.setState({ pilote: response.data })
                    }
                )
                this.title = "Modification de l'pilote"
            }
        }
    }

    Handlesubmit(e) {
        e.preventDefault()
        let pilote = this.state.pilote
        if (pilote.nomCompletPilote == null || pilote.adressePilote == null || pilote.dateNaissance == null || pilote.salaire == null) {
            alert("Les données saisies sont erronées")
            return
        }
        if (pilote.nomCompletPilote == "" || pilote.adressePilote == "" || pilote.dateNaissance == "") {
            alert("Les données saisies sont erronées")
            return
        } if (this.purpse == "Modifier") {
            axios.put(this.domain + "/pilote/update", pilote).then((response) => {
                this.responseAction(response)
            }).catch(() => alert("error coté serveur"))
        }
        else {
            axios.post(this.domain + "/pilote/nouveau", pilote).then((response) => {
                this.responseAction(response, pilote)
            }).catch(() => alert("error coté serveur"))
        }
    }

    responseAction(response, pilote) {
        if (response.status == 200) {
            alert("L'pilote " + this.state.pilote.nomCompletPilote + " est bien " + this.purpse.toLowerCase().slice(0, this.purpse.length - 2) + "é")
            window.location.href = "/pilote"
        } else 
            alert("error coté serveur") 
    }

    handleFormChange(pilote) {
        this.setState({ pilote })
    }
    handleNameChange(e) {
        e.preventDefault()
        const name = e.target.value
        const pilote = this.state.pilote
        pilote.nomCompletPilote = name
        this.handleFormChange(pilote)
    }
    handleadressePiloteChange(e) {
        e.preventDefault()
        const adressePilote = e.target.value
        const pilote = this.state.pilote
        pilote.adressePilote = adressePilote
        this.handleFormChange(pilote)
    }
    handleSalaryChange(e) {
        e.preventDefault()
        const salaire = e.target.value
        const pilote = this.state.pilote
        pilote.salaire = salaire
        this.handleFormChange(pilote)
    }
    handleBirthDayChange(e) {
        e.preventDefault()
        const dateNaissance = e.target.value
        const pilote = this.state.pilote
        pilote.dateNaissance = dateNaissance
        this.handleFormChange(pilote)
    }
    render() {
        return <div>
            <h1 className="m-3 text-center">{this.title}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="nomCompletPilote" className="form-label">Nom complet de pilote</label>
                    <input value={this.state.pilote.nomCompletPilote} type="test" className="form-control" id="nomCompletPilote" onChange={this.handleNameChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="adressePilote" className="form-label">adressePilote de pilote</label>
                    <input value={this.state.pilote.adressePilote} type="text" className="form-control" id="adressePilote" aria-describedby="adressePilote_h" onChange={this.handleadressePiloteChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="dateNaissance" className="form-label">date de Naissance</label>
                    <input type="date" value={this.state.pilote.dateNaissance} className="form-control" id="exampleInputEmail1" aria-describedby="dateNaissance_h" onChange={this.handleBirthDayChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="salaire" className="form-label">Salaire</label>
                    <input type="number" value={this.state.pilote.salaire} className="form-control" id="exampleInputEmail1" aria-describedby="dateNaissance_h" onChange={this.handleSalaryChange} />
                </div>

                <button className="btn btn-primary" onClick={this.Handlesubmit}>{this.purpse}</button>
                <Link className="btn btn-secondary m-3" to="/pilote">Retour</Link>
            </form>
        </div>
    }
}

export default PiloteForm