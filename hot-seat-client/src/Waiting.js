import React from 'react';
import './Waiting.css';

class Waiting extends React.Component{
    render() {
        return(
            <div class="wait">
                <h4>Waiting for other players</h4>
                <div class="loader"></div>
            </div>
        )
    }
}

export default Waiting;