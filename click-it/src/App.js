import React, { Component } from 'react';
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import './App.css';

import cards from "./cards.json"

class App extends Component {

  state = {
    cards,
    score: 0,
    highScore: 0,
  };

  // game functions here
  handleCardClick = id => {
    // loop over all the cards
    this.state.cards.forEach(card => {
      // if the id of the card clicked matches the id of the card in the array
      if (card.id === id) {
        // check to see if the card has been clicked on
        if (card.hasBeenClicked) {
          this.gameOver();
        } else {
          // flip flag variable on that card
          card.hasBeenClicked = true;
          // increment the score
          this.setState({ score: this.state.score + 1 });
          // check to see if the score is higher then the current high score
          if (this.state.score > this.state.highScore) {
            // update the highScore to be equal to the current score
            this.setState({ highScore: this.state.score });
          }
          // shuffle the cards
          this.state.cards.sort(() => Math.random() - 0.5);
        }
      }
    });
  }

  gameOver = () => {
    console.log('Game Over!')
  }

  render() {
    return (
      <Wrapper>
        <Header
          score={this.state.score}
          highScore={this.state.highScore}
        >Click it!
        </Header>
        {/* map over the cards */}
        {this.state.cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            name={card.name}
          />
        ))}
      </Wrapper>
    )
  }
}

export default App;
