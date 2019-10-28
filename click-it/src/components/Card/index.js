import React from 'react';

const Card = props => (
    <div onClick={props.handleCardClick(props.id)}>
        <img 
            alt={props.name} 
            src={props.image}            
        />
    </div>
)

export default Card;