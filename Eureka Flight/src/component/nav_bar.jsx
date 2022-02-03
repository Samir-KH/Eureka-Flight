import React from "react";


class Navbar extends React.Component {
    disconnect(){
        localStorage.clear()
        window.location.href="/"
    }
    render() {
        return <nav className="navbar navbar-expand-lg navbar-dark ">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><i className="fas fa-feather-alt"></i>  Eureka Flight</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {this.props.children}
                    </ul>
                </div>
                <div className="btn btn-outline-info my-2 my-sm-0" >Gream Team</div>
            </div>
        </nav>
    }
}

export default Navbar