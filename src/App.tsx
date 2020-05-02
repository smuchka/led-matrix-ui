import React from 'react';
import EditorPage from './pages/editor-page/EditorPage';
import './App.css';
// import logo from './logo.svg';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">LED Matrix</header>

        <main className="App-main">
          <EditorPage />
        </main>
      </div >
    )
  }
}

export default App;