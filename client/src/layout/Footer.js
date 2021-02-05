import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  Footer: {
    width: '100%',
    height: '100%'
  }
});

class Footer extends React.Component{
  render(){
    return(
      <div className="Footer">
      {/* <h5>footer 영역</h5> */}
      </div>
    )
  }
}

export default withStyles(styles)(Footer);