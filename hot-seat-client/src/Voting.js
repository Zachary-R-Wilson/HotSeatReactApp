import React from 'react';
//import './JoinGame.css';

class Voting extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            vote: ""
        }
    }

    handleVoteClick = (vote) => {
        this.setState({ vote }, () => {
            this.props.onVoteEnter(vote); // Call the parent callback with the selected vote
        });
    }

    render() {
        const { answers = [{ name: 'server', answer: 'Fail' }] } = this.props;

        return(
            <div>
                {answers.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => this.handleVoteClick(item.answer)}
                        style={{
                            padding: '10px',
                            margin: '5px',
                            border: '1px solid black',
                            cursor: 'pointer'
                        }}
                    >
                        {item.answer}
                    </div>
                ))}
            </div>
        )
    }
}

export default Voting;