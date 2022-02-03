import React from "react";


class VLink extends React.Component {
    render() {
        return <li className="nav-item">
            {this.props.children}
        </li>
    }
}

export default VLink