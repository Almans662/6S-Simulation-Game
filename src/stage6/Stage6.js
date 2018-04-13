import React, { Component } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './style.css';

let Container = styled.div`
  width: 400px;
  padding-bottom: 30px;
  background-color: #FFFFFF;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  padding-top: 50px;
`;

let Stage = styled.div`
  font-size: 48px;
`;


class App extends Component {
  render() {
    return (
      <div className="stage-6">
        <Container>
          <Stage>Stage 6 - Sustain</Stage>

          <ul>
            <li>The sixth “S” is Sustain</li>
            <li>Hardest to achieve since you have to maintain the following steps done to the workplace</li>
          </ul>

          <p>The following is a quiz to further assess your knowledge!</p>
          <a href="https://www.proprofs.com/quiz-school/story.php?title=mje1mjgwoqzaor">Quiz!</a>


        </Container>
      </div>
    );
  }
}

export default App;
