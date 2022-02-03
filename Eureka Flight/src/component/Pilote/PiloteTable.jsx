import React from "react";
import Table from "../Table/Table";
import TableHead from "../Table/TableHead";
import TableLink from "../Table/TableLink";
import axios from "axios";

class PiloteTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.state.piloteList = null
        this.domain = this.props.domain
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleDelete(e,index){
        e.preventDefault()
        let piloteList = this.state.piloteList
        const name = piloteList[index].nomCompletPilote
        if(window.confirm("Vouler vous supprimer l'pilote "+name)){
            const id = piloteList[index].numPilote
            axios.delete(this.domain+"/pilote/delete/"+id).then(
                (response)=>{
                    if(response.status == 200){
                        piloteList.splice(index,1)
                        this.setState({piloteList})
                    }
                }
            ).catch(()=>null)
        }
    }
    chargePilotesList(){
        axios.get( this.domain+"/pilote/all").then((response)=>{
        this.setState({piloteList:response.data, ok:"ok"})
        })
    }
    componentDidMount(){
        this.chargePilotesList()
    }
    createRow(pilote,index) {
        return <tr key={index}>
            <td className="small">
                <TableLink color="modify" to={"/pilote/modify/" + pilote.numPilote} iconClass="fas fa-pen" />
                <a className="tableButton delete" onClick={(e)=>this.handleDelete(e, index)}><i className="fas fa-trash-alt "/></a>
            </td>
            <td>{pilote.numPilote}</td>
            <td>{pilote.nomCompletPilote}</td>
            <td>{pilote.adressePilote}</td>
            <td>{pilote.dateNaissance}</td>
            <td>{pilote.salaire}</td>
        </tr>

    }
    render() {
        let rows = this.state.piloteList ? this.state.piloteList.map((pilote, index) => this.createRow(pilote, index)) : null
        return <Table>
            <TableHead>
                <th className=" fw-normal"></th>
                <th className=" fw-normal">numero pilote</th>
                <th className=" fw-normal">nom complet</th>
                <th className=" fw-normal">addresse</th>
                <th className=" fw-normal">date de naissance</th>
                <th className=" fw-normal">Salire</th>
            </TableHead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    }
}

export default PiloteTable