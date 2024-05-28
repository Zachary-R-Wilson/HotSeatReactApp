import React from 'react';
//import './JoinGame.css';

class Voting extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: ""
        }
    }

    GoClick = () => {
        var name = this.name.value;
        this.props.onNameEnter(name);
    }

    render() {
        return(
            <div>
                <label for="Name">Voting:</label>
                <br></br>
                <input type="text" id="Name" ref={(ref) => this.name = ref}></input>
                <br/>
                <button type="button" onClick={this.GoClick}>GO!</button>
            </div>
        )
    }
}

export default Voting;