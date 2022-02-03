import React from "react";


class TableHead extends React.Component {
    render() {
        return <thead className="tables table">
             <tr>{this.props.children}</tr>
      </thead>
    }
}

export default TableHead