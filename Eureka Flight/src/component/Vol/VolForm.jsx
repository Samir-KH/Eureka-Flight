import React from "react";
import { Link, matchPath, Redirect } from "react-router-dom";
import axios from "axios";


class VolForm extends React.Component {
    constructor(props) {
        super(props)
        this.domain = this.props.domain
        const path = window.location.pathname
        if (path == "/vol/nouveau") {
            this.purpse = "Plaanifier"
            this.title = "Planifier un vol"
        } else if (path.indexOf("/vol/modify") == 0) {
            this.purpse = "Modifier"
        }
        let vol = {
            refVol: null,
            villeDepart: "",
            villeArrivee: "",
            avion:0,
            pilote: 0,
            hDepart: this.getCurrentTimeHM(),
            hArrivee: this.getCurrentTimeHM(),
            dateVol: this.getCurrentDateYMD(),
        }
        this.currentDate = this.getCurrentDateYMD()
        this.state = { vol: vol, availabaleAvion: [], availabalePilote:[]}
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleVilleDepartChange = this.handleVilleDepartChange.bind(this)
        this.handleVilleArriveeChange = this.handleVilleArriveeChange.bind(this)
        this.handleAvionChange = this.handleAvionChange.bind(this)
        this.handlePiloteChange = this.handlePiloteChange.bind(this)
        this.handlehhDepartChange = this.handlehDepartChange.bind(this)
        this.handlehArriveeChange = this.handlehArriveeChange.bind(this)
        this.handledateVolChange = this.handledateVolChange.bind(this)

        this.Handlesubmit = this.Handlesubmit.bind(this)
    }
    checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
    getCurrentTimeHM(){          
        let today = new Date();
            let hh = today.getHours();
            let mm = today.getMinutes();
            let ss = today.getSeconds();
            // add a zero in front of numbers<10
            ss = this.checkTime(ss);
            mm = this.checkTime(mm);
            hh = this.checkTime(hh);
            return hh+":"+mm+":"+ss
    }
    getCurrentDateYMD(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
        dd='0'+dd;
        } 

        if(mm<10) 
        {
        mm='0'+mm;
        } 
        today = yyyy+"-"+mm+'-'+dd;
        return today
    }
    getAvailabaleAvion(){
        axios.get(this.domain+"/avion/availabale").then(
            (resp)=>{
                this.setState({availabaleAvion: resp.data})
            }
        )
    }
    getAvion(numAvion){
        axios.get(this.domain+"/avion/"+numAvion).then(
            (resp)=>{
                 const avion = resp.data
                 const availabaleAvion = this.state.availabaleAvion
                 availabaleAvion.unshift(avion)
                 const vol = this.state.vol
                 vol.avion = 0
                 this.setState({vol,availabaleAvion})
            }
        )
    }
    getPilote(numPilote){
        axios.get(this.domain+"/pilote/"+numPilote).then(
            (resp)=>{
                const pilote = resp.data
                const availabalePilote = this.state.availabalePilote
                availabalePilote.unshift(pilote)
                const vol = this.state.vol
                vol.pilote = 0
                this.setState({vol,availabalePilote})
           }
        )
    }
    getAvailabalePilote(){
        axios.get(this.domain+"/pilote/availabale").then(
            (resp)=>{
                let availabalePilote = resp.data
                this.setState({availabalePilote})
            }
        )
    }
    getRefVolFromURL(path) {
        const matchPathUrl = "^/vol/modify/[0-9A-Z]+$"
        const test = path.match(matchPathUrl)
        if (test != null) {
            let data = path.match("/[0-9A-Z]+$")
            return data[0].slice(1)
        } else return null
    }
    componentDidMount() {
        this.getAvailabaleAvion()
        this.getAvailabalePilote()
        if (this.purpse == "Modifier") {
            const path = window.location.pathname
            let refVol = this.getRefVolFromURL(path)
            if (refVol != null) {
                axios.get(this.domain + "/vol/" + refVol).then(
                    (response) => {
                        let vol = response.data
                        this.setState({vol})
                        this.getAvion(vol.numAvion)
                        this.getPilote(vol.numPilote)
                    }
                )
                this.title = "Modification de vol"
            }
        }
    }

    Handlesubmit(e) {
        e.preventDefault()
        let vol = this.state.vol
        if (vol.villeDepart == null || vol.villeArrivee == null || vol.avion == null || vol.pilote == null
            || vol.hDepart == null || vol.hArrivee == null || vol.dateVol == null) {
            alert("Les données saisies sont erronées")
            return
        }
        if (vol.villeDepart == "" || vol.villeArrivee == "") {
            alert("Les données saisies sont erronées")
            return
        } 
        if (new Date(vol.dateVol) < new Date(this.currentDate)) {
            alert("veuillez choisir une date valide")
            return
        }
        this.state.vol.numAvion = this.state.availabaleAvion[this.state.vol.avion].numAvion
        this.state.vol.numPilote = this.state.availabalePilote[this.state.vol.pilote].numPilote
        vol = this.state.vol
        if (this.purpse == "Modifier") {
            console.log(vol)
            axios.put(this.domain + "/vol/update", vol).then((response) => {
                this.responseAction(response)
            }).catch(() => alert("error coté serveur"))
        }
        else {
            axios.post(this.domain + "/vol/nouveau", vol).then((response) => {
                this.responseAction(response, vol)
            }).catch(() => alert("error coté serveur"))
        }
    }

    responseAction(response, vol) {
        if (response.status == 200) {
            alert("L'vol de " +this.state.vol.villeDepart +" à "+this.state.vol.villeArrivee+" est bien " + this.purpse.toLowerCase().slice(0, this.purpse.length - 2) + "é")
            window.location.href = "/vol"
        } else 
            alert("error coté serveur") 
    }

    handleFormChange(vol) {
        this.setState({ vol })
    }
    handleVilleDepartChange(e) {
        e.preventDefault()
        const villeDepart = e.target.value
        const vol = this.state.vol
        vol.villeDepart = villeDepart
        this.handleFormChange(vol)
    }
    handleVilleArriveeChange(e) {
        e.preventDefault()
        const villeArrivee = e.target.value
        const vol = this.state.vol
        vol.villeArrivee = villeArrivee
        this.handleFormChange(vol)
    }
    handleAvionChange(e){
        e.preventDefault()
        const avion = e.target.value
        const vol = this.state.vol
        vol.avion = avion
        this.handleFormChange(vol)
    }
    handlePiloteChange(e){
        const pilote = e.target.value
        const vol = this.state.vol
        vol.pilote = pilote
        this.handleFormChange(vol)
    }
    handlehDepartChange(e){
        const hDepart = e.target.value
        const vol = this.state.vol
        vol.hDepart = hDepart
        this.handleFormChange(vol)
    }
    handlehArriveeChange(e){
        const hArrivee = e.target.value
        const vol = this.state.vol
        vol.hArrivee = hArrivee
        this.handleFormChange(vol)
    }
    handledateVolChange(e){
        const dateVol = e.target.value
        const vol = this.state.vol
        vol.dateVol = dateVol
        this.handleFormChange(vol)
        
    }
    render() {
        const avionRow = this.state.availabaleAvion ?  this.state.availabaleAvion.map((avion,index)=>{
            return <option value={index} key={index}>{avion.nomAvion}</option>
        }): null
        const piloteRow = this.state.availabalePilote ?  this.state.availabalePilote.map((pilote,index)=>{
            return <option value={index} key={index}>{pilote.nomCompletPilote}</option>
        }): null
        return <div>
            <h1 className="m-3 text-center">{this.title}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="villeDepart" className="form-label">ville de départ</label>
                    <input value={this.state.vol.villeDepart} type="test" className="form-control" id="villeDepart" onChange={this.handleVilleDepartChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="villeArrivee" className="form-label">ville d'arrivée</label>
                    <input value={this.state.vol.villeArrivee} type="text" className="form-control" id="villeArrivee" aria-describedby="villeArrivee" onChange={this.handleVilleArriveeChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pilote" className="form-label">avion</label>
                    <select value={this.state.vol.avion} className="form-control"  onChange={this.handleAvionChange}>
                        {avionRow}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="pilote" className="form-label">pilote</label>
                    <select type="text" value={this.state.vol.pilote} className="form-control"  onChange={this.handlePiloteChange}>
                        {piloteRow}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="hDepart" className="form-label">heur de départ</label>
                    <input type="time" value={this.state.vol.hDepart} className="form-control"  onChange={this.handlehDepartChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="hArrivee" className="form-label" >heur d'arrivée</label>
                    <input type="time" value={this.state.vol.hArrivee} className="form-control" onChange={this.handlehArriveeChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="dateVol" className="form-label">date d'arrivée</label>
                    <input type="date" value={this.state.vol.dateVol} className="form-control" onChange={this.handledateVolChange} />
                </div>
                <button className="btn btn-primary" onClick={this.Handlesubmit}>{this.purpse}</button>
                <Link className="btn btn-secondary m-3" to="/vol">Retour</Link>
            </form>
        </div>
    }
}

export default VolForm