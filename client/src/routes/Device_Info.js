import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  menu1__container: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center',
    backgroundcolor: 'DodgerBlue',
    padding: 20,
    borderRadius: 5,
    width: 100,
    maxwidth: 400,
    fontweight: 300,
    minWidth: 920
  },
  paper: {
    marginLeft: 38,
    marginRight: 38
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  }
})

function Device_Info() {

  return (
    <div className="menu1__container" align='center' style={{ backgroundColor: 'red', height: '100px', minHeight: '200px', padding: '5%' }}>
     
      <Header />

      <div className="menu">
         <Paper className="paper">
            "Freedom is the freedom to say that two plus two make four. If that i
            granted, all else follows???"
            - George Orwell, 19841
        </Paper>
      </div>

      <Footer />
      
    </div>
  )
}

export default withStyles(styles)(Device_Info);