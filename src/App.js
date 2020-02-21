import React, { Component } from 'react';
import './App.css';

import Board from './components/board.js';
import InfoTab from './components/InfoTab.js';


class App extends Component {
    constructor(){
        super()
        this.state = {
            allScores: [],
            numClicks: 0,
            info: (<InfoTab allScores={[]} clicks={0}/>)
        }
    }

    storeResults = (score) => {
        let { allScores } = this.state
        allScores.unshift(score)
        this.setState({
            allScores: allScores,
            info: this.generateInfoTab(allScores)
         })
    }

    storeClicks = (clicks) => {
        this.setState({
            numClicks: clicks,
            info: this.generateInfoTab(this.state.allScores, clicks)
         })
    }

    generateInfoTab = (allScores, clicksIn=this.state.numClicks) => {
        return (<InfoTab allScores={allScores} clicks={clicksIn}/>)
        // return (<InfoTab allScores={this.state.allScores}/>)
    }


    render(){
        return(
          <>
            <div>Hello</div>
            <div className="GamePlay">
                <Board storeResults={this.storeResults} storeClicks={this.storeClicks}/>
                {this.state.info}
            </div>
          </>
        )
    }
  }

export default App
