import React from 'react';
import './App.css';
import JoinGame from './JoinGame';
import Answering from './Answering';
import Voting from './Voting';
import DisplayAnswers from './DisplayAnswers';
import Scoring from './Scoring';
import Waiting from './Waiting';

const gameStates = ["join", "answer", "vote", "display", "score"];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      answer: "",
      vote: "",
      Score: "",
      gameState: gameStates[0]
    };
  }

  handleNameEnter = (enteredName) => {
    this.setState({
      name: enteredName,
      gameState: gameStates[1]
    });
  }

  handleAnswerChange = (uAnswer) => {
    this.setState({
      answer: uAnswer,
      gameState: gameStates[2]
    });
  }

  render() {
    if(this.state.gameState === gameStates[0]){
      return (
        <div className="App">
          <JoinGame onNameEnter={this.handleNameEnter}/>
        </div>
      );
    }
    else if(this.state.gameState === gameStates[1]){
      return (
        <div className="App">
          <Answering onAnswerEnter={this.handleAnswerChange}/>
        </div>
      );
    }
    else if(this.state.gameState === gameStates[2]){
      return (
        <div className="App">
          <Voting onNameEnter={this.handleNameEnter}/>
        </div>
      );
    }
    else if(this.state.gameState === gameStates[3]){
      return (
        <div className="App">
          <DisplayAnswers onNameEnter={this.handleNameEnter}/>
        </div>
      );
    }
    else if(this.state.gameState === gameStates[4]){
      return (
        <div className="App">
          <Scoring onNameEnter={this.handleNameEnter}/>
        </div>
      );
    }
    else{
      return(
        <div className="App">
          <Waiting />
        </div>
      );
    }
  }
}

export default App;
