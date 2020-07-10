import React from 'react';
import './App.css';
import { store } from './redux/createStore.js'
import { Provider } from 'react-redux'
import Board from './components.js/Board.js'

// store.subscribe(() => {console.log("from sub", store.getState())})

function App() {
  return (
    <Provider store={store}>
      <Board></Board>
    </Provider>
  );
}

export default App;
