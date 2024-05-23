import React from 'react';
import './App.css';
import JoinGame from './JoinGame';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "", 
      currentRoom: "General"
    };
  }

  handleNameEnter = (enteredName) => {
    this.setState({name: enteredName});
  }

  render() {
    return (
      <div className="App">
        <JoinGame onNameEnter={this.handleNameEnter}/>
        <p>hello {this.state.name}</p>
      </div>
    );
  }
}

export default App;
