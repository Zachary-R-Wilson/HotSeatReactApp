import React from 'react';
import './JoinGame.css';

class Answering extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            answer: ""
        }
    }

    SubmitAnswerClick = () => {
        var answer = this.answer.value;
        this.props.onAnswerEnter(answer);
    }

    render() {
        return(
            <div className="form">
                <label for="answer">Answer the Question:</label>
                <br/>
                <input type="text" id="answer" ref={(ref) => this.answer = ref}/>
                <br/>
                <button type="button" onClick={this.SubmitAnswerClick}>Submit</button>
            </div>
        )
    }
}

export default Answering;