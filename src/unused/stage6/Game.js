import React, { Component } from 'react';
import GameCanvas from './GameCanvas';
import styled from 'styled-components';

import rx3 from '../images/rx-square-3.png';
import bandage from '../images/bandage2vertical.png';
import scissor from '../images/scissor-closed-vertical.png';
import WrongIconModal from '../WrongIconModal';


let Container = styled.div`
  width: 1200px;
  height: 600px;
  background-color: #FFFFFF;
  margin: 0 auto;
  margin-top: 100px;
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
    margin-top: 3px;
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
  margin-top: 5px;
`;

let FinishedText = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;

class App extends Component {

  state = {
    // rx3NumClicked: 0,
    // bandageNumClicked: 0,
    // scissorNumClicked: 0,
    secondsLeft: 20,
    timerRunning: false,
    gameDone: false,
    showWrongModal: false

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

  goToNextStage(e) {
    e.preventDefault();
    console.log(this.props);
    this.props.history.push("/stage7-cover");
  }

  getStartButton() {
    if (this.state.gameDone == true) {
      return <StartButton onClick={this.goToNextStage.bind(this)}>
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
              Stage 6 - Sustain
            </StageText>
          </Header>
          <GameCanvas
            // rx3Clicked={() => {
            //   this.setState({rx3NumClicked: this.state.rx3NumClicked+1})
            // }}
            // bandageClicked={() => {
            //   this.setState({bandageNumClicked: this.state.bandageNumClicked+1})
            // }}
            // scissorClicked={() => {
            //   this.setState({scissorNumClicked: this.state.scissorNumClicked+1})
            // }}
            shouldHandleDrag={this.state.timerRunning} // only when the time is running, the user is able to drag
            wrongItemSelected={() => {
              if (this.state.showWrongModal) {
                return; // if the modal is already shown, stop here
              }

              // show wrong modal
              this.setState({showWrongModal: true});

              // make it disappaer after one second
              setTimeout(() => {
                this.setState({showWrongModal: false});
              }, 1000)
            }}
          />
          <SideBar>
            <Instruction>
              {/*<SideBarTitle>Instruction</SideBarTitle>*/}
              {/*<ul>*/}
                {/*<li>Pick 5 <Icon src={rx3} width={30} height={30}/> (Rx3)</li>*/}
                {/*<li>Pick 5 <Icon src={bandage} width={8} height={30}/></li>*/}
                {/*<li>Pick 5 <Icon src={scissor} width={14} height={30}/></li>*/}
              {/*</ul>*/}
            </Instruction>
            {this.getStartButton()}
            <Instruction>
              {/*<SideBarTitle>Score</SideBarTitle>*/}
              {/*<ul>*/}
                {/*<li>{this.state.rx3NumClicked} Rx4 picked</li>*/}
                {/*<li>{this.state.bandageNumClicked} bandage picked</li>*/}
                {/*<li>{this.state.scissorNumClicked} scissor picked</li>*/}
              {/*</ul>*/}
            </Instruction>
          </SideBar>
          {this.state.showWrongModal && <WrongIconModal/>}

        </Container>
      </div>
    );
  }
}

export default App;
