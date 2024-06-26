import React from 'react';
import './App.css';
import JoinGame from './JoinGame';
import Answering from './Answering';
import Voting from './Voting';
import DisplayAnswers from './DisplayAnswers';
import Scoring from './Scoring';
import Waiting from './Waiting';

const gameStates = ["wait","join", "answer", "vote", "display"];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      answer: "",
      vote: "",
      gameState: gameStates[1],
      answers:[],
      scores: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.props.socket.on('update-state', this.handleStateUpdate);
    this.props.socket.on('message', this.handleMessage);
  }

  handleMessage(msg) {
    this.setState({
      gameState: msg.gameState,
      answers: msg.answers,
      scores: msg.scores
    });
  }

  sendMessage() {
    this.props.socket.emit('message', {
      name: this.state.name,
      answer: this.state.answer,
      vote: this.state.vote,
      score: this.state.score,
      gameState: this.state.gameState
    });
  }

  handleNameEnter = (enteredName) => {
    this.setState({name: enteredName}, () => {
      this.sendMessage();
      this.setState({ gameState: gameStates[0] });
    });
  }

  handleAnswerChange = (uAnswer) => {
    this.setState({answer: uAnswer}, () => {
      this.sendMessage();
      this.setState({ gameState: gameStates[0] });
    });
  }

  handleVote = (uVote) => {
    this.setState({vote: uVote}, () => {
      this.sendMessage();
      this.setState({ gameState: gameStates[0] });
    });
  }

  handleNextRound = () => {
    this.setState({ gameState: gameStates[1] }, () => {
      this.sendMessage();
      this.setState({ gameState: gameStates[0] });
    });
  }

//// Create Special Host permissions to solve the duplicate answers issue/+4
  render() {
    switch(this.state.gameState){
      default:
        return(
          "Error"
        );
      case gameStates[0]:
        return(
          <div className="App">
            <Waiting />
          </div>
        );
      case gameStates[1]:
        return (
          <div className="App">
            <JoinGame onNameEnter={this.handleNameEnter}/>
          </div>
        );
      case gameStates[2]:
        return (
          <div className="App">
            <Answering onAnswerEnter={this.handleAnswerChange}/>
          </div>
        );
      case gameStates[3]:
        return (
          <div className="App">
            <Voting answers={this.state.answers} onVoteEnter={this.handleVote}/>
          </div>
        );
      case gameStates[4]:
        return (
          <div className="App">
            <DisplayAnswers answers={this.state.answers} scores={this.state.scores} onNext={this.handleNextRound}/>
          </div>
        );
    }    
  }
}

export default App;
