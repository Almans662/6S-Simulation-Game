import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import Stage0Cover from './stage0/Cover';
import Stage0Game from './stage0/Game';
import Stage1Cover from './stage1/Cover';
import Stage1Game from './stage1/Game';
import Stage2Cover from './stage2/Cover';
import Stage2Game from './stage2/Game';
import Stage3Cover from './stage3/Cover';
import Stage3Game from './stage3/Game';
import Stage4Cover from './stage4/Cover';
import Stage4Game from './stage4/Game';
import Stage5Cover from './stage5/Cover';
import Stage5Game from './stage5/Game';
import Stage6 from './stage6/Stage6';

const RedirectToStage1Route = ({component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Redirect to="/stage0-cover"/>
  )}/>
)

class App extends Component {

  render() {
    return (
      <Router>
        <div className="page-container">
          <Route exact path="/" component={RedirectToStage1Route} />
          <Route path="/stage0-cover" component={Stage0Cover}/>
          <Route path="/stage0-game" component={Stage0Game}/>
          <Route path="/stage1-cover" component={Stage1Cover}/>
          <Route path="/stage1-game" component={Stage1Game}/>
          <Route path="/stage2-cover" component={Stage2Cover}/>
          <Route path="/stage2-game" component={Stage2Game}/>
          <Route path="/stage3-cover" component={Stage3Cover}/>
          <Route path="/stage3-game" component={Stage3Game}/>
          <Route path="/stage4-cover" component={Stage4Cover}/>
          <Route path="/stage4-game" component={Stage4Game}/>
          <Route path="/stage5-cover" component={Stage5Cover}/>
          <Route path="/stage5-game" component={Stage5Game}/>
          <Route path="/Stage6" component={Stage6}/>
        </div>
      </Router>
    );
  }
}

export default App;
