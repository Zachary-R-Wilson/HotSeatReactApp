import React from 'react';
//import './JoinGame.css';

class DisplayAnswers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: ""
        }
    }

    nextClick = () => {
        this.props.onNext();
    }

    render() {
        const { answers } = this.props;
        const { scores } = this.props;
        const joinedArray = answers.map(answer => {
            const score = scores.find(s => s.name === answer.name);
            return {
                name: answer.name,
                answer: answer.answer,
                score: score ? score.score : 0
            };
        });
        return(
            <div>
                {joinedArray.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '10px',
                            margin: '5px',
                            border: '1px solid black',
                            cursor: 'pointer'
                        }}
                    >
                        <strong>{item.name}:</strong> {item.answer}
                        <br/> 
                        <div>Points: {item.score}</div>
                    </div>
                ))}
                <button type="button" onClick={this.nextClick}>Next Round?</button>
            </div>
        )
    }
}

export default DisplayAnswers;