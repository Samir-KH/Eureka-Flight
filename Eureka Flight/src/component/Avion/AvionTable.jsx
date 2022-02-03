import React from "react";
import Table from "../Table/Table";
import TableHead from "../Table/TableHead";
import TableLink from "../Table/TableLink";

class AvionTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.axios = props.axios
        this.state.avionList = null
        this.domain = this.props.domain
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleDelete(e,index){
        e.preventDefault()
        let avionList = this.state.avionList
        const name = avionList[index].nomAvion
        if(window.confirm("Vouler vous supprimer l'avion "+name)){
            const id = avionList[index].numAvion
            this.axios.delete(this.domain+"/avion/delete/"+id).then(
                (response)=>{
                    if(response.status == 200){
                        avionList.splice(index,1)
                        this.setState({avionList})
                    }
                }
            ).catch(()=>null)
        }
    }
    chargeAvionsList(){
        this.axios.get( this.domain+"/avion/all").then((response)=>{
        this.setState({avionList:response.data, ok:"ok"})
        })
    }
    componentDidMount(){
        this.chargeAvionsList()
    }
    createRow(avion,index) {
        return <tr key={index}>
            <td className="small">
                <TableLink color="modify" to={"/avion/modify/" + avion.numAvion} iconClass="fas fa-pen" />
                <a className="tableButton delete" onClick={(e)=>this.handleDelete(e, index)}><i className="fas fa-trash-alt "/></a>
            </td>
            <td>{avion.numAvion}</td>
            <td>{avion.nomAvion}</td>
            <td>{avion.marque}</td>
            <td>{avion.capacite}</td>
            <td>{avion.ville}</td>
        </tr>

    }
    render() {
        let rows = this.state.avionList ? this.state.avionList.map((avion, index) => this.createRow(avion, index)) : null
        return <Table>
            <TableHead>
                <th className=" fw-normal"></th>
                <th className=" fw-normal">numero avion</th>
                <th className=" fw-normal">nom avion</th>
                <th className=" fw-normal">marque</th>
                <th className=" fw-normal">capacité</th>
                <th className=" fw-normal">ville d'attachement</th>
            </TableHead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    }
}

export default AvionTable