import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import { observer } from 'mobx-react';
import Home from './Home'
//import About from './About'
import Topics from './Topics' 
import MapTest from './MapTest'
import GeoContainer from '../containers/GeoContainer/GeoContainer'

@observer
export default class App extends React.Component {
  render() {
    return (

<BrowserRouter>
        <div>
          <ul className="list-group" >
            <li className="list-group-item"><Link to="/">Home</Link></li>
            <li className="list-group-item"><Link to="/about">About</Link></li>
            <li className="list-group-item"><Link to="/topics">Topics</Link></li>
            <li className="list-group-item"><Link to="/maptest">MapTest</Link></li>

          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/topics" component={Topics} />
          <Route path="/maptest" component={GeoContainer} />

        </div>
      </BrowserRouter>

    )
  }
}
