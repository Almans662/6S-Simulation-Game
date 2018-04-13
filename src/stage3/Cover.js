import React, { Component } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

let Container = styled.div`
  width: 400px;
  height: 300px;
  background-color: #FFFFFF;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);

`;

let Stage = styled.div`
  font-size: 40px;
`;

let Start = styled(Link)`
  font-size: 20px;
  //border: 3px solid #5D9BC0;
  //padding: 10px 20px;
  //border-radius: 15px;
  margin-top: 50px;

  background: #3498db;
  background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
  background-image: -moz-linear-gradient(top, #3498db, #2980b9);
  background-image: -ms-linear-gradient(top, #3498db, #2980b9);
  background-image: -o-linear-gradient(top, #3498db, #2980b9);
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  -webkit-border-radius: 28;
  -moz-border-radius: 28;
  border-radius: 28px;
  font-family: Arial;
  color: #ffffff;
  font-size: 20px;
  padding: 10px 30px 10px 30px;
  text-decoration: none;
  
  &:hover {
    background: #3cb0fd;
    background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
    background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
    background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
    background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
    background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
    text-decoration: none;
  }
`;

class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Stage>Stage 3 - Straighten</Stage>
          <Start to="stage3-game">Start</Start>
        </Container>
      </div>
    );
  }
}

export default App;
