import React, { Component } from 'react'
import { Map, TileLayer, GeoJSON ,Polygon, Polyline, Tooltip} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

export default class MapTest extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      geodata: null,
      geojson:[[37.583188928,127.108360559],[37.583166949,127.108360528],[37.582881627,127.107829369],[37.582721564,127.107649397]],
      emd_nm:'법정동',
      tmpdata:'aa',
      id: '',
      geoCodeList: null,
      selectOptionList:null,
      selected: 'select',
      
    }
  }
 
  onChange(e) {
     console.log(e.target.value)
     this.setState({selected:e.target.value}) 
     this.props.onChangeSelect(e.target.value) 

     console.log('zoom',this.refs.polygon.leafletElement)
    // this.map.fitBounds(this.refs.polygon.leafletElement)
    console.log(this.map)
  }

  makeBounds() {
    console.log(this.map)
    console.log(this.refs.polygon.leafletElement.getBounds())
/   this.map.leafletElement.fitBounds(this.refs.polygon.leafletElement.getBounds())

  }

  onCreatedHandler (e) {
    console.log("polygon create:",e)
  }

  componentDidMount() {
   console.log("didMount")
  }

  componentDidUpdate() {
    console.log("didupdate")
    if (this.state.id > 0) {
      this.makeBounds()
      console.log("good")
    }


  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate",nextProps, nextState)



    return true
  }


  componentWillUnmount() {
    console.log("componentWillUnmount")
  }

   static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps")

    // 여기서는 setState 를 하는 것이 아니라
    // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
    // 사용됩니다.
	console.log(1)
	console.log(prevState)
	console.log(nextProps)

    if (nextProps.geodata !== null && nextProps.geodata !== prevState.geodata) {
      console.log("changed geo data geodata")
      return { 
	geodata: nextProps.geodata,
        tmpdata: nextProps.tmpdata,
        id: nextProps.geodata[0].id,
        geojson: JSON.parse(nextProps.geodata[0].geojson).coordinates,
        emd_nm: nextProps.geodata[0].emd_nm
      };
    }

    if (nextProps.geoCodeList !== prevState.geoCodeList) {
      console.log("changed geo data geoCodeList")
      return {
        geoCodeList: nextProps.geoCodeList,       
        selectOptionList: nextProps.geoCodeList.map(({emd_cd}, index) => <option key={index} value={emd_cd} >{emd_cd}</option>)
      };
    }

    return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미 

  }



  render () {
    console.log("render:",this.state)
    const position = [37.562, 126.966]    
    const zoom = 14

    const {geodata, geojson, emd_nm, tmpdata, id, geoCodeList, selectOptionList, selected} = this.state;
    const { onChangeSelect } = this.props;
    return (
       <div style={{width:'100%', display: 'inline-flex'}}>
        <div className="form-group" style={{height:'600px', width:'200px', zIndex:'1'}}>
          <select id="geoCode" value={this.state.selected} onChange={this.onChange.bind(this)} className="form-control btn btn-secondary dropdown-toggle">
            {selectOptionList} 
         </select>
        <div className="alert alert-primary" >{emd_nm}</div>
        </div>
        <div id="mapid" className="map leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab" style={{height:'600px',width:'100%',position:'relative'}}>
          <Map center={position} zoom={zoom} ref={(ref) => { this.map = ref; }} >
            <TileLayer
            //attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url="http://map.nicebizmap.co.kr:38080/TileMap/{z}/{x}/{y}.png"
             url="http://api.vworld.kr/req/wmts/1.0.0/08F063B2-1798-38C5-B388-59B77894CD75/Base/{z}/{y}/{x}.png"
            //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

           <Polygon color='purple' positions={geojson} ref="polygon">
             <Tooltip sticky>
              <span>{emd_nm}</span>
              </Tooltip>
            </Polygon>
          </Map>
        </div>

      </div>


    )
  }
}

