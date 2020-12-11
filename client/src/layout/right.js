import React, { Component } from 'react';
import axios from 'axios';
import './main.css';

class list extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this._getListData()
  }

  _getListData = async function () {
    /*     const data_list = await axios('/GetUserInfo', {
          method: 'GET',
          headers: new Headers()
        }) */

    const data_list = await axios('/GetUserInfo')

    this.setState({ data: data_list })
  }

  render() {
    const list = this.state.data.data
    console.log("list1 == ", list);
    console.log("list2 == ", this.state.data.data);
    console.log("list3 == ", this.state.data);

    return (
      <div className='List'>

        <div className='list_grid list_tit'>
          <div> MACHINEID </div>
        </div>

        {list ? list.map( (el, key) => {
          return (
            <div className='list_grid list_data' key={key}>
              <div> {el.MACHINEID} </div>
            </div>
          )
        })
          : null}
      </div>
    );
  }
}

export default list;