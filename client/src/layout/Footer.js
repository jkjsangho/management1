import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  Footer: {

  }
});

class Footer extends React.Component{
  render(){
    return(
      <div className="Footer">
      <h5>footer입니다.</h5>
      </div>
    )
  }
}

export default withStyles(styles)(Footer);