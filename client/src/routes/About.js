import React from "react";
import "./About.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

import axios from "axios";

/* import socketio from 'socket.io-client'; */

function About(props) {
    console.log(props);

/*     const socket = socketio.connect('/');

    (() => {
        socket.emit('init', { name: 'bella' });

        socket.on('welcome', (msg) => {
            console.log(msg);
        });

    })(); */

    axios.post('post', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response)
        console.log('response')
      })
      .catch(function (error) {
        console.log(error)
        console.log('error')
      });

/*     axios.post('/',{
        params: {
          foo: 'bar'
        }
      }); */

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