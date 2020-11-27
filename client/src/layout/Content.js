import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  Footer: {

  }
});

class Content extends React.Component{
  render(){
    return(
      <div className="Content">
      <h5>Content 영역</h5>
      </div>
    )
  }
}

export default withStyles(styles)(Content);