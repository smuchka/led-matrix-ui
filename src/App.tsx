import React from 'react';
import EditorPage from './pages/editor-page/EditorPage';
import Layout from './hoc/Layout/Layout';
import './App.css';
// import logo from './logo.svg';

class App extends React.Component {

  render() {
    return (
      <Layout>
        <EditorPage />
      </Layout>
    )
  }
}

export default App;