import React from 'react';

const InfoTab = (props) => {

    // let score = props.allScores[0]
    // console.log(score+"score")
    // let passedScores = props.allScores.slice(1)

    // if(props.allScores[0] === ""){
    //
    //     score = 0
    //     passedScores = "-"
    // }

    let allScores = props.allScores

    if(allScores.length === 0){
        allScores = [0]
    }

    return(
      <div className="InfoTab">
        <div>Rules: blah blah blah</div>
        <div>Clicked: {props.clicks}</div>
        <div className="Score">Score: <div className="Score-Number">{allScores[0]}</div></div>
        <div>
            Passed Scores:
            <div className="Scores">{allScores.slice(1).map(s => s = (<div>{s}</div>))}</div>
        </div>
        <div></div>
      </div>
    )
}
export default InfoTab
//<div></div>
