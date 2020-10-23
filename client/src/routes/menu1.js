import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  menu1__container: {
    marginTop: 100,
    marginBottom: 100,
    display: 'flex',
    justifyContent: 'center',
    backgroundcolor: 'white',
    padding: 20,
    borderradius: 5,
    width: 100,
    maxwidth: 400,
    fontweight: 300,
    minWidth: 920
  },
  paper: {
    marginLeft: 38,
    marginRight: 38,
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'center'
  },
})

function menu1(props) {

  return (
    <div className="menu1__container">
      <Header />
      <div className="menu">
        <Paper className="paper">
          <span>
            "Freedom is the freedom to say that two plus two make four. If that i
            granted, all else follows!!!"
                </span>
          <span>- George Orwell, 19841</span>
        </Paper>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(styles)(menu1);