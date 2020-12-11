import React from 'react';
import Customer from '../components/Customer'
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
//import CustomerAdd from './components/CustomerAdd';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 920
  },
  menu: {
    marginTop: 50,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 25,
    marginRight: 25
  },
  progress: {
    margin: theme.spacing(2)
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  loader: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifycontent: 'center',
    alignitems: 'center',
    fontweight: 300
  }

  /*
  root: {
  width: "100%",
  marginTop: theme.spacing.unit * 3,
  overflowX: "auto"
  },
  table: {
  minWidth: 1080
  }
  */
});

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      customers: '',
      completed: 0
    };
    /* this.stateRefresh = this.stateRefresh.bind(this); */
  }
  componentDidMount() {

    this.timer = setInterval(this.progress, 1000);
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  callApi = async () => {
    const response = await fetch('api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };



  render() {

    const { classes } = this.props;

    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "시간", "성별", "직업"];

    const columns = [
      { field: 'id', headerName: '번호', width: 70 },
      { field: 'image', headerName: '프로필 이미지', width: 130 },
      { field: 'Name', headerName: '이름', width: 130 },
      {
        field: 'birthday',
        headerName: '생년월일',
        type: 'number',
        width: 90,
      },
      { field: 'gender', headerName: '성별', width: 130 },
      { field: 'job', headerName: '직업', width: 130 }
    ];

    return (
      <div className={classes.root}>
        <Header />
        <div className={classes.menu}>
          {/* <CustomerAdd stateRefresh={this.stateRefresh} /> */}
        </div>
        <Paper className={classes.paper}>
          <Table>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ?
                this.state.customers.map(c => {
                  return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} time={c.time} gender={c.gender} job={c.job} />
                }) :
                <TableRow>
                  <TableCell colSpan="7" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
{/*         <div style={{ height: 400, width: '100%' }}>
          <DataGrid columns={columns} row={this.state.customers} pageSize={5} checkboxSelection/>
        </div> */}
        <Footer />
      </div>
    );
  }
}



export default withStyles(styles)(Home);