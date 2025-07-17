import React from "react";
import { Link } from "react-router-dom";

class Landing extends React.Component {
    render() {
        return (
        <div className="container">
            <h1>LOGIN </h1>
            <div className="center">
                <Link to="/register" className="btn">Register</Link>
                <br />
                <Link to="/login" className="btn">Login</Link>
            </div>
        </div>
     );
  }
}

export default Landing;