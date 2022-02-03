import React from "react";


class Table extends React.Component {
    render() {
        return <table className="table">
                {this.props.children}
            </table>
    }
}

export default Table