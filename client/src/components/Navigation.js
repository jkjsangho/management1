import React from "react";
import {Link} from "react-router-dom";
import "./Navigation.css"

function Navigation(){
    return (<div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/menu1">menu1</Link>
    </div>
    )
}

export default Navigation;