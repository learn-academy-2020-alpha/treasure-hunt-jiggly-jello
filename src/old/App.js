import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Board from "./components/Board"



export default class App extends Component {



  render() {
    return (
      <div className="App">
        Big Boi Boards
        <Board />
      </div>
    );
  }
}
