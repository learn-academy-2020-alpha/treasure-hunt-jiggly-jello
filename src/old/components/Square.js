import React from 'react';
import '../App.css';

const Square = (props) => {
    return (
      <div id="square"
        onClick={ () => props.handleClick(props.x, props.y) }>
        { props.item }
      </div>
    );
}
export default Square;
