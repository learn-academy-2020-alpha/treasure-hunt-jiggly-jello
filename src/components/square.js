import React, { Component } from 'react';

class Square extends Component{

click = () => {
  this.props.handleClick(this.props.index)
}

  render(){
    return(
      <div id = "square" onClick = { this.click } style={{height: this.props.length},{width:this.props.length}}>
      {this.props.icon}
      </div>
    )
  }
}
export default Square
