import React from 'react';

import MapTest from '../../components/MapTest'
import * as service from '../../services/GeoService'
//import $ from 'jquery'


export default class GeoContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      geodata:null,
      geoCodeList:null
    };
//    this.getGeodata();
    this.getGeoCodeList();
  }

   static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps")

    // 여기서는 setState 를 하는 것이 아니라
    // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
    // 사용됩니다.
	console.log("geoContainer")
	console.log(prevState)
	console.log(nextProps)

//    if (nextProps.geodata !== prevState.geodata) {
 //     console.log("changed geo data geodata")
 //     return { 
//	geodata: nextProps.geodata,
 //       tmpdata: nextProps.tmpdata,
  //      id: nextProps.geodata[0].id,
        
  //    };
   // }

  return null
  }

  handleSelectBoxChange = (geoCode) => {
    this.getGeodata(geoCode);
  }

  getGeodata = async (geoCode) => {
    try {
      const info = await Promise.all([
        service.getGeodata(geoCode)

      ]);
      
      this.setState({
        geodata: info[0].data

      });
    } catch (e) {
      console.log('error',e)
    } finally {
      console.log('success container', this.state.geodata)
    }
  }

  getGeoCodeList = async () => {
    console.log("getGeoCodeList")
    try {
        const info = await Promise.all([
          service.getGeoCodeList()
      ]);
      this.setState({
        geoCodeList: info[0].data
        
      })

    } catch (e) {
      console.log('error', e)
    } finally {
      console.log('success container', this.state.geoCodeList)
    }
   
  }

  render() {
    const { geodata,geoCodeList } = this.state
    return (
      <MapTest
        geodata={geodata}
        geoCodeList={geoCodeList}
        tmpdata='ttt'
        onChangeSelect={this.handleSelectBoxChange}
      />
    );
  }
}
