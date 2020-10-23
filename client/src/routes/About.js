import React from "react";
import "./About.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

function About(props) {
    console.log(props);

    const { location } = props;

    console.log(location.props);

    return (
        <div className="Header">
            <Header />
            <div className="about__container">

                <span>
                    "Freedom is the freedom to say that two plus two make four. If that i
                    granted, all else follows!!!"
                </span>
                <span>- George Orwell, 19841</span>
            </div>
            <Footer />
        </div>
    )
}

export default About;