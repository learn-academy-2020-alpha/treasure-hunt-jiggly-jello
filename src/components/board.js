import React, { Component } from 'react';
import Square from './square.js'

class Board extends Component{
  constructor(props){
    super(props)
    this.state = {
        tempSize: "",
      size: 3,
      gameBoard : [],
      treasure: [7],
      bomb: [4],
      clicks: 0,
      clickedSquares: [],
      displayBoard: "",
      score: 0,
      disabled: false
    }
  this.state.gameBoard = this.buildBoard(this.state.size)
  this.state.displayBoard = this.generateDisplayboard(this.state.gameBoard, this.state.size)
  }


  buildBoard = (num) => {
    let newRow = []
    for (let i = 0; i < num**2; i++){
      newRow = newRow.concat(0)
    }

    let { gameBoard, size } = this.state
    for (let i = 0; i < gameBoard.length; i++){
        gameBoard[i] = <Square
        index = {i}
        treasure = { this.state.treasure }
        bomb = { this.state.bomb }
        handleClick = { this.handleClick }
        length = { this.squareLength(size) }
        />
     }


     let treasurePosistion = [Math.floor(Math.random()*(num**2))]

     let bombLocations = []
     for(let b=0; b<num-2; b++){
         let bombsPosistion = [Math.floor(Math.random()*(num**2))]
         //console.log(bombsPosistion)
         if(!bombLocations.includes(bombsPosistion) && bombsPosistion !== treasurePosistion){
               bombLocations = bombLocations.concat(bombsPosistion)
         }
         else{ b--; }


     }


     this.setState({
         displayBoard: gameBoard,
         treasure: treasurePosistion,
         bomb: bombLocations
     })

    return newRow
  }

  generateDisplayboard = (gameBoard, size, newIcon = "🤔") => {
      //let { gameBoard, size } = this.state
      //newIcon = String.fromCharCode(Math.floor(Math.random()*25)+65);
      //console.log(newIcon)
      for (let i = 0; i < gameBoard.length; i++){
          gameBoard[i] = (
              <>
                  <Square
                  index = {i}
                  treasure = { this.state.treasure }
                  bomb = { this.state.bomb }
                  handleClick = { this.handleClick }
                  length = { this.squareLength(size) }
                  icon={newIcon}
                  />
              </>)
       }
      return gameBoard
  }


  handleClick = (index) => {

     if(this.state.disabled){
         return
     }



     let { clicks, clickedSquares, gameBoard } = this.state
    clickedSquares.push(index)
    this.setState({clickedSquares:clickedSquares})
    let clicked = new Set(this.state.clickedSquares)
    clicks = clicked.size
    this.setState({ clicks: clicks })

    this.props.storeClicks(clicks)


    //let newIcon = String.fromCharCode(Math.floor(Math.random()*25)+65);
    let newIcon = "🍕"
    if (this.state.treasure.includes(index)){
        newIcon = "💖"
    } else if (this.state.bomb.includes(index)){
        newIcon = "💣"
    }
    gameBoard[index] = (
        <>
            <Square
            index = {index}
            treasure = { this.state.treasure }
            bomb = { this.state.bomb }
            handleClick = { this.handleClick }
            length = { this.squareLength(this.state.size) }
            icon={newIcon}
            />
        </>)


    if (this.state.treasure.includes(index)){
      this.playerHasWon(clicks)
    }
    if (this.state.bomb.includes(index)){
      this.playerHasLost(clicks)
    }
  }


  squareLength = (num) => {
    return 500/num - 2
  }

  setSize = () =>{

      let num = parseInt(this.state.tempSize)
      if(this.state.tempSize === ""){
          num = this.state.size
      }

      if(!isNaN(num) && num < 10 && num > 2){
          // Generate treasure
          let treasurePosistion = [Math.floor(Math.random()*(num**2))]
          console.log(`Treasure: ${treasurePosistion}`)
          console.log()

          let bombLocations = []
          for(let b=0; b<num-2; b++){
              let bombsPosistion = [Math.floor(Math.random()*(num**2))]
              //console.log(bombsPosistion)
              if(bombsPosistion[0] === treasurePosistion[0]){
                  b--;
              }
              else if(bombLocations.includes(bombsPosistion)){
                  b--;
              }
              else{
                  bombLocations.push(bombsPosistion)
              }
          }
          console.log("Bombs:", bombLocations.map(L => L = ` ${L} `).join(""))

          let newBoard = this.buildBoard(num)
          this.setState({
              size: num,
              gameBoard: newBoard,
              treasure: treasurePosistion,
              bomb: bombLocations,
              clicks: 0,
              clickedSquares: [],
              displayBoard: this.generateDisplayboard(newBoard,num),
              score: 0,
              disabled: false
          })
          this.props.storeClicks(0)
      }
  }

  handleChange = (event) => {
      this.setState({ tempSize: event.target.value })
      console.log(event.target.value)
  }


// *******************    Win  &  Loose   *******************

  playerHasWon = (clicks) => {
      let { size } = this.state
      let score = size*100 + Math.ceil((size**2)/clicks)*10
      this.setState({
          score: score,
          disabled: true
      })
      this.props.storeResults(score)
      alert("Win")
  }

  playerHasLost = (clicks) => {
      let { size } = this.state
      this.setState({
          score: "Ew",
          disabled: true
      })
      alert("Loss")
  }

/*
 handleGameEnd(){
     this.setState({
         score: "Ew",
         disabled: true
     })
 }
*/





///*** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***\\\


  render(){

    return(
        <div>
            <div id="board">
                { this.state.displayBoard }
            </div>
            <div>
                <input onChange={this.handleChange} placeholder="sdfgsdfgs"/>
                <button onClick={this.setSize}>Reset with Size</button>
            </div>
      </div>
    )
  }
}


export default Board;
