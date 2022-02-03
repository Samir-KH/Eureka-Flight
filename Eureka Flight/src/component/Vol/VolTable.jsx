import React from "react";
import Table from "../Table/Table";
import TableHead from "../Table/TableHead";
import TableLink from "../Table/TableLink";
import axios from "axios";

class VolTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.state.VolList = null
        this.domain = this.props.domain
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleDelete(e,index){
        e.preventDefault()
        let VolList = this.state.VolList
        const name = VolList[index].refVol
        if(window.confirm("Vouler vous supprimer l'Vol "+name)){
            const id = VolList[index].refVol
            axios.delete(this.domain+"/vol/delete/"+id).then(
                (response)=>{
                    if(response.status == 200){
                        VolList.splice(index,1)
                        this.setState({VolList})
                    }
                }
            ).catch(()=>null)
        }
    }
    chargeVolsList(){
        let etat = 0
        axios.get( this.domain+"/vol/all").then((response)=>{
            let ListofVol = response.data;
            for(let i = 0; i < ListofVol.length; i++){
                const vol = ListofVol[i]
                axios.get( this.domain+"/avion/"+vol.numAvion).then((resp)=>{
                    ListofVol[i].nomAvion =  resp.data.nomAvion
                    if (etat == 2*ListofVol.length - 2){
                        this.setState({VolList:ListofVol, ok:"ok"})
                    }
                    etat++;
                })
                axios.get( this.domain+"/pilote/"+vol.numPilote).then((resp)=>{
                    ListofVol[i].nomCompletPilote =  resp.data.nomCompletPilote
                    if (etat == 2*ListofVol.length - 2){
                        this.setState({VolList:ListofVol, ok:"ok"})
                    }
                    etat++;
                })
            }
        }).catch((err)=>{console.error(err)})
    }
    componentDidMount(){
        this.chargeVolsList()
    }
    getStatus(date){
        let ardate = new Date(date)
        let now = Date.now()
        if(ardate < now){
            return "Terminé"
        }else if(ardate > now){
            return "Prévu"
        }else return "Encour"
    }
    createRow(Vol,index) {
        return <tr key={index}>
            <td className="small">
                <TableLink color="modify" to={"/vol/modify/" + Vol.refVol} iconClass="fas fa-pen" />
                <a className="tableButton delete" onClick={(e)=>this.handleDelete(e, index)}><i className="fas fa-trash-alt "/></a>
            </td>
            <td>{Vol.refVol}</td>
            <td>{Vol.villeDepart}</td>
            <td>{Vol.villeArrivee}</td>
            <td>{Vol.nomAvion}</td>
            <td>{Vol.nomCompletPilote}</td>
            <td>{Vol.hDepart}</td>
            <td>{Vol.hArrivee}</td>
            <td>{Vol.dateVol}</td>
            <td>{this.getStatus(Vol.dateVol)}</td>
        </tr>

    }
    render() {
        let rows = this.state.VolList ? this.state.VolList.map((Vol, index) => this.createRow(Vol, index)) : null
        return <Table>
            <TableHead>
                <th className=" fw-normal"></th>
                <th className=" fw-normal">reference de Vol</th>
                <th className=" fw-normal">ville de d'épart</th>
                <th className=" fw-normal">ville d'arrivée</th>
                <th className=" fw-normal">nom avion</th>
                <th className=" fw-normal">nom complet de pilote</th>
                <th className=" fw-normal">l'heur de départ</th>
                <th className=" fw-normal">l'heur d'arrivée</th>
                <th className=" fw-normal">date de vol</th>
                <th className=" fw-normal">status</th>
            </TableHead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    }
}

export default VolTable