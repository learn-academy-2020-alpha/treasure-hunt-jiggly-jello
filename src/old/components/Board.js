import React, { Component } from 'react';
import '../App.css';

import Square from "./Square"


export default class Board extends Component {




    constructor(props){
        super(props)

        this.SIZE = 12  //  3 min  ,  12 max  ,  6 is good

        //let [itemNeutral, itemBomb, itemTreasure] = ["?", "B", "T"]

        this.itemNeutral    =   "?"
        this.itemBomb       =   "B"
        this.itemTreasure   =   "T"

        this.boardMatrix = this.setUpBoard(this.SIZE)
        console.log(this.boardMatrix)
        console.log(this.SIZE)


        this.state = {
            boardDisplay: this.spaceBoard(this.boardMatrix)//this.spaceBoard(this.setUpBoard(initSize)),
        }
        this.scaleDisplayBoard()

        //  For some reason, it doesn't update in time, and refuses to display
        ////  NEW
        /*
        let { boardMx } = this.state
        boardMx = this.setUpBoard(this.SIZE)
        this.setState({ boardMx: boardMx })
        this.setState({ boardDisplay: this.spaceBoard(boardMx) })
        */
        //// OLD
        //this.boardMatrix = this.setUpBoard(this.SIZE)
        //this.state.boardDisplay = this.spaceBoard(this.boardMatrix)

        ////// NEW NEW


    }


    setUpBoard = (size, display=this.itemNeutral) => {

        let rows = new Array(size);

        rows.fill(this.setSquare(display, 0, 0))     //switch to forEach to get the index and set it
        //console.log(rows.length)
        let board = rows.map( (el, index) => { return Array.from(rows) } )       // get index as well


        // TODO later
        for(let x=0; x<rows.length; x++){
            for(let y=0; y<rows.length; y++){

            }
        }


        return board
        //let board = rows.map( el => { return rows } )       // get index as well

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        //      We had 5 references to the one original array.
        //       Now,using 'Array.from()',
        //        we create a new array that is a copy of our base Array.
        /*
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        */

    }

    spaceBoard = (board) => {
        for(let el=0; el<board.length; el++)
        { board[el] = (<div>{board[el]}</div>) }
        return board
    }

    setSquare = (display=this.itemNeutral, x=0, y=0) => {
        return(
            <Square
                x = {x}
                y = {y}
                item={display}
                handleClick={this.handleClick}/>
        )
    }


/*  *  *  *  *  *  *  *  *  *  *  *  */


    handleClick = (x=0, y=0) => {
        //alert("hey ")
        //event.preventDefault();
        //this.setState({ itemNeutral: "@" })
        //this.itemNeutral = "@"
        //console.log(this.itemNeutral)

        //this.boardMatrix = this.setUpBoard(this.SIZE)
        //this.state.boardDisplay = this.spaceBoard(this.boardMatrix)


        let newSymbol = "@"
        let newBoardMatrix = this.setUpBoard(this.SIZE, newSymbol)

        this.setState({
            boardDisplay: this.spaceBoard(newBoardMatrix)
        })
        //this.boardMatrix[0][0] = this.setSquare("G")
        //this.boardMatrix[0][0] = (<Square item="G" handleClick={this.handleClick}/>)
    }

/*********************************************************************************************************/

    //     Understanding setState
    /*
        https://www.freecodecamp.org/news/get-pro-with-react-setstate-in-10-minutes-d38251d1c781/
    */

/*********************************************************************************************************/


    scaleDisplayBoard = () => {
        let scale = ( (100 - this.SIZE) / 100) - ( (this.SIZE/100) * 1.8 )
        //let scale = (1.0 - ((100-this.SIZE)/100)) * 10
        //let scale = (100/this.SIZE)
        console.log(scale)
        let root = document.documentElement;
        root.style.setProperty('--scale', scale);
    }



/*  *  *  *  *  *  *  *  *  *  *  *  */
//              Tests
/*  *  *  *  *  *  *  *  *  *  *  *  */

    doTest_ChangeSpecificElements = () => {
        //this.boardMatrix[0].props.children[0] = this.setSquare("G")

        /*
        let { boardMx } = this.state
        boardMx[0].props.children[0] = this.setSquare("G")
        boardMx[2].props.children[1] = this.setSquare("8")
        boardMx[1].props.children[2] = this.setSquare("&")
        */


        // TODO

        // Refill 'boardMx' will the new values BEFORE giving it to 'setState'
        // > problem with 'boardMx[].props.children[]'
        //   expecting: 'boardMx[][]'

        this.boardMatrix[0][0] = this.setSquare("G")
        this.boardMatrix[2][1] = this.setSquare("8")
        this.boardMatrix[1][2] = this.setSquare("&")

        this.setState({
            boardDisplay: this.spaceBoard(this.boardMatrix)
         })

    }

    doTest_ChangeScaleVarCSS() {
        let root = document.documentElement;
        root.style.setProperty('--scale', 0.5);
    }

    doTest_ChangeScaleVarCSS_UsingSize = () => {
        /*
        let scale = ((100/this.SIZE)/100)
        scale *= 5
        */
        //scale = (scale + ((100-scale)/1000))
        //scale = scale - (scale/10)

        /////
        let scale = ( (100 - this.SIZE) / 100) - ( (this.SIZE/100) * 1.8 )
        /////

        let root = document.documentElement;
        root.style.setProperty('--scale', scale);


        /*  Variables in CSS

            (Better Example)    https://css-tricks.com/updating-a-css-variable-with-javascript/
            (Eh Example)        https://developer.mozilla.org/en-US/docs/Web/CSS/var
        */
        console.log(this.SIZE)
    }







  render() {
    return (
        <div className="BoardSpace">
            Board
          <div id="board">
            {this.state.boardDisplay}
          </div>
          <button onClick={this.doTest_ChangeSpecificElements}>Change Some Items</button>
          <button onClick={this.doTest_ChangeScaleVarCSS}>Change Scale</button>
          <button onClick={this.doTest_ChangeScaleVarCSS_UsingSize}>Change Scale Based on Size of Table</button>
          <div>{this.boardMatrix[0]}</div>
      </div>
    );
  }
}
