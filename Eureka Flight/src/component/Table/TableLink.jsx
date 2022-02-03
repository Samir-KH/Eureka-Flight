import React from "react";
import {Link} from "react-router-dom";

class TableLink extends React.Component {
    render() {
        return <Link className={"tableButton "+ this.props.color} to={this.props.to}><i className={this.props.iconClass}></i></Link>
    }
}

export default TableLink