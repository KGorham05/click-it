import React from 'react';
import "./style.css";

const Card = props => (
    <div  onClick={() => props.handleCardClick(props.id)}>
        <img 
            alt={props.name} 
            src={props.image}  
            className="card"          
        />
    </div>
)

export default Card;