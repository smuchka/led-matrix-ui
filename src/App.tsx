import React from 'react';
// import logo from './logo.svg';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import EditorPage from './pages/editor-page/EditorPage';
// import Home from './pages/home/Home';
import CreateNewDimentions from './pages/create-new-dimentions/CreateNewDimentions';
import ListTemplates from './pages/template-list/ListTemplates';

class App extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <Layout>
        <Switch>
          {/* <Route path='/' exact component={Home} /> */}
          <Route path='/template/new' component={CreateNewDimentions} />
          <Route path='/template/:tmpName' component={EditorPage} />
          <Route path='/select-template' exact component={ListTemplates} />
          <Redirect to="/select-template" />
        </Switch>
      </Layout>
    )
  }
}

export default App;