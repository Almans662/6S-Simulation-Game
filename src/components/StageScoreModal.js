import React, { Component } from 'react';


const StageScoreModal = ({score, buttonHandler}) => {
  return (
    <div className="modal-container">
      <div className="wrong-item-modal">
        <div className="total-score">Your Total Score</div>
        <div className="score">{score}</div>
        <a onClick={buttonHandler}>Go to next stage</a>
      </div>
  
    </div>

  )
};

export default StageScoreModal;