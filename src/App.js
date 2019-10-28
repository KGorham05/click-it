import React, { Component } from 'react';
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import './App.css';

import cards from "./cards.json"

class App extends Component {

  state = {
    data: cards,
    score: 0,
    highScore: 0,
  };

  componentDidMount() {
    this.setState({ data: this.shuffleData(this.state.data) });
  };

  handleCorrectGuess = newData => {
    // deconstruct state variables 
    const { highScore, score } = this.state;
    // increment the score
    const newScore = score + 1;
    // set the high score = whichever is greater, newScore or existing highScore
    const newHighScore = Math.max(newScore, highScore);

    // update the state
    this.setState({
      data: this.shuffleData(newData),
      score: newScore,
      highScore: newHighScore
    });
  };

  handleIncorrectGuess = data => {
    this.setState({
      data: this.resetData(data),
      score: 0
    });
  };

  resetData = data => {
    const resetData = data.map(item => ({ ...item, hasBeenClicked: false }));
    return this.shuffleData(resetData);
  };

  shuffleData = data => {
    let i = data.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
      i--;
    }
    return data;
  };

  handleCardClick = id => {
    let guessedCorrectly = false;
    const newData = this.state.data.map(item => {
      // copy the existing item data
      const newItem = { ...item };
      // check if the newItem ID matches the ID that was clicked
      if (newItem.id === id) {
        // check to see if it has not been clicked yet this game
        if (!newItem.hasBeenClicked) {
          newItem.hasBeenClicked = true;
          guessedCorrectly = true;
        }
      }
      return newItem;  
    });
    guessedCorrectly 
      ? this.handleCorrectGuess(newData)
      : this.handleIncorrectGuess(newData)

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
        {this.state.data.map(card => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            name={card.name}
            handleCardClick={this.handleCardClick}
          />
        ))}
      </Wrapper>
    )
  }
}

export default App;
