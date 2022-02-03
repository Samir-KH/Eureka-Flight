import React from "react";
import { Link, matchPath, Redirect } from "react-router-dom";


class AvionForm extends React.Component {
    constructor(props) {
        super(props)
        this.axios = props.axios
        this.axios = props.axios
        this.domain = this.props.domain
        const path = window.location.pathname
        if (path == "/avion/nouveau") {
            this.purpse = "Ajouter"
            this.title = "Ajout d'une nouvelle avion"
        } else if (path.indexOf("/avion/modify") == 0) {
            this.purpse = "Modifier"
        }
        let avion = {
            numAvion: null,
            nomAvion: "",
            marque: "Airbus",
            capacite: 0,
            ville: "",
        }
        this.state = { avion: avion }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleAirPlaneNameChange = this.handleAirPlaneNameChange.bind(this)
        this.handleAirPlaneMarqueChange = this.handleAirPlaneMarqueChange.bind(this)
        this.handleAirPlaneCapaciteChange = this.handleAirPlaneCapaciteChange.bind(this)
        this.handleAirPlaneVilleChange = this.handleAirPlaneVilleChange.bind(this)
        this.Handlesubmit = this.Handlesubmit.bind(this)
    }
    getNumAvionFromUrl(path) {
        const matchPathUrl = "^/avion/modify/[0-9]+$"
        const test = path.match(matchPathUrl)
        if (test != null) {
            let data = path.match("/[0-9]+$")
            return data[0].slice(1)
        } else return null
    }

    componentDidMount() {
        const path = window.location.pathname
        if (this.purpse == "Modifier") {
            let numAvion = this.getNumAvionFromUrl(path)
            if (numAvion != null) {
                this.axios.get(this.domain + "/avion/" + numAvion).then(
                    (response) => {
                        this.setState({ avion: response.data })
                    }
                )
                this.title = "Modification de l'avion"
            }
        }
    }

    Handlesubmit(e) {
        e.preventDefault()
        let avion = this.state.avion
        if (avion.nomAvion == null || avion.marque == null || avion.capacite == null || avion.ville == null) {
            alert("Les données saisies sont erronées")
            return
        }
        if (avion.nomAvion == "" || avion.marque == "" || avion.ville == "") {
            alert("Les données saisies sont erronées")
            return
        } if (this.purpse == "Modifier") {
            this.axios.put(this.domain + "/avion/update", avion).then((response) => {
                this.responseAction(response)
            }).catch(() => alert("error coté serveur"))
        }
        else {
            this.axios.post(this.domain + "/avion/nouveau", avion).then((response) => {
                this.responseAction(response, avion)
            }).catch(() => alert("error coté serveur"))
        }
    }

    responseAction(response, avion) {
        if (response.status == 200) {
            alert("L'avion " + this.state.avion.nomAvion + " est bien " + this.purpse.toLowerCase().slice(0, this.purpse.length - 2) + "é")
            window.location.href = "/avion"
        } else 
            alert("error coté serveur") 
    }

    handleFormChange(avion) {
        this.setState({ avion })
    }
    handleAirPlaneNameChange(e) {
        e.preventDefault()
        const name = e.target.value
        const avion = this.state.avion
        avion.nomAvion = name
        this.handleFormChange(avion)
    }
    handleAirPlaneMarqueChange(e) {
        e.preventDefault()
        const marque = e.target.value
        const avion = this.state.avion
        avion.marque = marque
        this.handleFormChange(avion)
    }
    handleAirPlaneCapaciteChange(e) {
        e.preventDefault()
        const capacite = e.target.value
        const avion = this.state.avion
        avion.capacite = capacite
        this.handleFormChange(avion)
    }
    handleAirPlaneVilleChange(e) {
        e.preventDefault()
        const ville = e.target.value
        const avion = this.state.avion
        avion.ville = ville
        this.handleFormChange(avion)
    }
    render() {
        return <div>
            <h1 className="m-3 text-center">{this.title}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="nomAvion" className="form-label">Nom d'avion</label>
                    <input value={this.state.avion.nomAvion} type="test" className="form-control" id="nomAvion" onChange={this.handleAirPlaneNameChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="marque" className="form-label">Marque d'avion</label>
                    <select value={this.state.avion.marque} className="form-select" id="marque" onChange={this.handleAirPlaneMarqueChange}>
                        <option value="Airbus">Airbus</option>
                        <option value="Antonov">Antonov</option>
                        <option value="ATR">ATR</option>
                        <option value="BAE Systems">BAE Systems</option>
                        <option value="Boeing">Boeing</option>
                        <option value="Bombardier">Bombardier</option>
                        <option value="Britten-Norman">Britten-Norman</option>
                        <option value="Bristol">Bristol</option>
                        <option value="BAE Systems">BAE Systems</option>
                        <option value="Comac">Comac</option>
                        <option value="Convair">Convair</option>
                        <option value="Dassault Aviation">Dassault Aviation</option>
                        <option value="De Havilland">De Havilland</option>
                        <option value="Dornier">Dornier</option>
                        <option value="Douglas">Douglas</option>
                        <option value="Embraer">Embraer</option>
                        <option value="Fairchild">Fairchild</option>
                        <option value="Fokker">Fokker</option>
                        <option value="Ford">Ford</option>
                        <option value="Grumman">Grumman</option>
                        <option value="Hawker Siddeley">Hawker Siddeley</option>
                        <option value="Iliouchine (Ilyushin)">Iliouchine (Ilyushin)</option>
                        <option value="Keystone">Keystone</option>
                        <option value="Martin">Martin</option>
                        <option value="Lockheed">Lockheed</option>
                        <option value="McDonnell Douglas">McDonnell Douglas</option>
                        <option value="Short">Short</option>
                        <option value="Soukhoï">Soukhoï</option>
                        <option value="Stinson">Stinson</option>
                        <option value="Tupolev">Tupolev</option>
                        <option value="Sud-Aviation">Sud-Aviation</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="capacite" className="form-label">Capacité</label>
                    <input value={this.state.avion.capacite} type="number" className="form-control" id="capacite" aria-describedby="capacite_h" onChange={this.handleAirPlaneCapaciteChange} />
                    <div id="capacite_h" className="form-text">le nombre de places d'un avion</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="ville" className="form-label">Ville d'attachement</label>
                    <input type="test" value={this.state.avion.ville} className="form-control" id="exampleInputEmail1" aria-describedby="ville_h" onChange={this.handleAirPlaneVilleChange} />
                    <div id="ville_h" className="form-text">la ville de l'aéroport d'attache de l'avion</div>
                </div>

                <button className="btn btn-primary" onClick={this.Handlesubmit}>{this.purpse}</button>
                <Link className="btn btn-secondary m-3" to="/avion">Retour</Link>
            </form>
        </div>
    }
}

export default AvionForm