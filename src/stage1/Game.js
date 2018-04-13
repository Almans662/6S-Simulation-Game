import React, { Component } from 'react';
import styled from 'styled-components';
import { Stage, Layer, Rect, Text } from 'react-konva';
import GameCanvas from './Canvas';
import WrongIconModal from '../components/WrongIconModal';
import StageScoreModal from '../components/StageScoreModal';

// import images
import needle from '../images/needle.png';
import bandage from '../images/bandage.png';
import scissorOpen from '../images/scissor-open.png';
import rx2 from '../images/rx-all-circle/rx-square-2.png';

let Container = styled.div`
  width: 800px;
  height: 600px;
  background-color: #FFFFFF;
  margin: 0 auto;
  display: grid;
  border-radius: 10px;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  grid-template-columns: 1fr 200px ;
  grid-template-rows: 50px auto;
  position: relative;
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
  font-size: 20px;
`;

let FinishedText = styled.div`
  font-size: 20px;
`;

let filenames = ["tape-roll.png", "bandage2.png", "tweezer1.png", "rx-all-circle/rx-square-3.png"];

export default class extends Component {

  state = {
    [filenames[0]]: 0,
    [filenames[1]]: 0,
    [filenames[2]]: 0,
    [filenames[3]]: 0,

    showInstructionCover: true,
    secondsLeft: 20,
    timerRunning: false,
    gameDone: false,
    showWrongModal: false,
    showScoreModal: false,
    totalScore: 0
  };

  maxPickNum = 5;

  handleStart() {
    if (this.state.timerRunning == true) return;

    this.setState({ timerRunning: true, showInstructionCover: false });

    this.timer = setInterval(() => {
      this.setState({ secondsLeft: this.state.secondsLeft - 1 });

      if (this.state.secondsLeft == 0) {
        clearInterval(this.timer);
        // calculate total score
        let totalScore =
          this.state[filenames[0]] +
          this.state[filenames[1]] +
          this.state[filenames[2]] +
          this.state[filenames[3]];
        this.setState({
          gameDone: true,
          timerRunning: false,
          showScoreModal: true,
          totalScore
        });
      }
    }, 1000);

  }

  goToNextStage(e) {
    // e.preventDefault();
    // console.log(this.props);
    this.props.history.push("/stage2-cover");
  }

  getStartButton() {
    if (this.state.gameDone == true) {
      return <StartButton onClick={this.goToNextStage.bind(this)}>
        <FinishedText>Time is up</FinishedText>
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
              Stage 1: Sort
            </StageText>
          </Header>
          <GameCanvas

            filenames={filenames}

            showInstructionCover={this.state.showInstructionCover}
            iconClicked={(filename) => {
              let numClicked = this.state[filename];
              this.setState({ [filename]: numClicked + 1 })
            }}

            shouldHandleClick={this.state.timerRunning} // only handle click when the timer is running
            wrongItemSelected={() => {
              if (this.state.showWrongModal) {
                return; // if the modal is already shown, stop here
              }

              // show wrong modal
              this.setState({ showWrongModal: true });

              // make it disappaer after one second
              setTimeout(() => {
                this.setState({ showWrongModal: false });
              }, 1000)
            }}
          />
          <SideBar>
            <Instruction>
              <SideBarTitle>Instruction</SideBarTitle>
              <ul>
                <li>Pick 5 <Icon src={require(`../images/${filenames[0]}`)} width={40} height={30} /></li>
                <li>Pick 5 <Icon src={require(`../images/${filenames[1]}`)} width={60} height={30} /></li>
                <li>Pick 5 <Icon src={require(`../images/${filenames[2]}`)} width={30} height={30} /></li>
                <li>Pick 5 <Icon src={require(`../images/${filenames[3]}`)} width={30} height={30} /></li>
              </ul>
            </Instruction>
            {this.getStartButton()}
            <Instruction>
              <SideBarTitle>Score</SideBarTitle>
              <ul>
                <li>{this.state[[filenames[0]]]} tape roll picked</li>
                <li>{this.state[[filenames[1]]]} bandage picked</li>
                <li>{this.state[[filenames[2]]]} tweezer picked</li>
                <li>{this.state[[filenames[3]]]} Rx3 picked</li>
              </ul>
            </Instruction>
          </SideBar>
          {this.state.showWrongModal && <WrongIconModal />}
          {this.state.showScoreModal && <StageScoreModal
            score={this.state.totalScore}
            buttonHandler={() => {
              this.goToNextStage();
            }}
          />}
        </Container>
      </div>
    );
  }
}