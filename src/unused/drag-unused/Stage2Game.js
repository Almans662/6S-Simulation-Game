import React, { Component } from 'react';
import styled from 'styled-components';
import { Stage, Layer, Rect, Text } from 'react-konva';
import GameCanvas from './Stage2GameCanvas';
import bandage from '../images/bandage.png';
import scissor from '../images/scissor.png';
import rx from '../images/rx.png';

let Container = styled.div`
  width: 800px;
  height: 600px;
  background-color: #FFFFFF;
  margin: 0 auto;
  margin-top: 100px;
  display: grid;
  border-radius: 10px;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  grid-template-columns: 1fr 200px ;
  grid-template-rows: 50px auto;
`;

let Header = styled.div`
  grid-column-start: 1;
  grid-column-end: span 2;
  color: white;
  display: flex;
  font-size: 30px;
`;

let Logo = styled.div`
  height: 100%;
  background-color: #0052A9;
  box-sizing: border-box;
  padding: 10px;
  color: black;
`;

let StageText = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  background-color: #1A7DE1;
  width: 100%;
  color: #6ab7ff;
`;


let SideBar = styled.div`
   background-color: #74D0FF;
`;

let Instruction = styled.div`
  padding: 10px;
  
  & li {
    line-height: 1.5em;
  }
`;

let Icon = styled.img`
    vertical-align: middle;
`;

let SideBarTitle = styled.h2`
  font-size: 30px;
  margin: 20px 0;
`;

let StartButton = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #006CBA;
  border-radius: 10px;
  margin: 20px 10px 0;
  cursor: pointer;
`;

let StartText = styled.div`
  font-size: 35px;
  margin-top: 10px;
`;

let InstructionText = styled.p`
  line-height: 1.6em;
`;


let FinishedText = styled.div`
  font-size: 30px;
  margin-top: 10px;
`;


class App extends Component {

  state = {
    medicationCount: 0,
    bandageCount: 0,
    instrumentCount: 0,
    secondsLeft: 20,
    timerRunning: false,
    gameDone: false
  };

  handleStart() {
    if (this.state.timerRunning == true) return;

    this.setState({timerRunning: true});

    this.timer = setInterval(() => {
      this.setState({secondsLeft: this.state.secondsLeft - 1});

      if (this.state.secondsLeft == 0) {
        clearInterval(this.timer);
        this.setState({gameDone: true, timerRunning: false});
      }
    }, 1000);


  }

  getStartButton() {
    if (this.state.gameDone == true) {
      return <StartButton onClick={this.handleStart.bind(this)}>
        <FinishedText>Time is up, go to next stage</FinishedText>
      </StartButton>
    }

    if (this.state.timerRunning == false) {
      return <StartButton onClick={this.handleStart.bind(this)}>
        <div>{this.state.secondsLeft} seconds left</div>
        <StartText>Start</StartText>
      </StartButton>
    } else if (this.state.timerRunning == true) {
      return <StartButton onClick={this.handleStart.bind(this)}>
        <StartText>{this.state.secondsLeft} seconds left</StartText>
      </StartButton>
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Header>
            <Logo>
              6SGame
            </Logo>
            <StageText>
              Stage 2
            </StageText>
          </Header>
          <GameCanvas
            onDrag={(medicationCount, bandageCount, instrumentCount) => {
              // console.log('medication count ' + medicationCount);
              // console.log('bandageCount count ' + bandageCount);
              // console.log('instrumentCount count ' + instrumentCount);
              this.setState({
                medicationCount,
                bandageCount,
                instrumentCount
              })
            }}
            gameDone={this.state.gameDone}
          />
          <SideBar>
            <Instruction>
              <SideBarTitle>Instruction</SideBarTitle>
              <InstructionText>Drag 5 medications, 5 instruments and 5 bandages at the bottom to right boxes at the top.</InstructionText>
            </Instruction>
            {this.getStartButton()}
            <Instruction>
              <SideBarTitle>Score</SideBarTitle>
              <ul>
                <li>{this.state.medicationCount} medication</li>
                <li>{this.state.bandageCount} bandges</li>
                <li>{this.state.instrumentCount} instruments</li>
              </ul>
            </Instruction>
          </SideBar>
        </Container>
      </div>
    );
  }
}

export default App;
