import React, { Component } from 'react';
import { PLAYER_ONE_START } from '../lib/Constants';
const AppContext = React.createContext();

export default class AppProvider extends Component {
  state = {
    fieldValues: false,
    playerOne: Object.create(PLAYER_ONE_START),
    gameState: { state: 'new', rnd: 1 },
    bingo: { state: false, bingoFields: [] },
    setState: (state) => this.setState(state),
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div id='board'>{this.props.children}</div>
      </AppContext.Provider>
    );
  }
}

export { AppContext, AppProvider };
