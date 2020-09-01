import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { CreateNewDimentions } from './pages/create-new-dimentions/CreateNewDimentions';
import { EditorPage } from './pages/editor-page/EditorPage';
import Home from './pages/home/Home';
import { ListTemplates } from './pages/template-list/ListTemplates';
// import logo from './logo.svg';
import { PARAM_EDITOR_TEMPLATE } from './helpers/constants';

class App extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/welcome' exact component={Home} />
          <Route path='/new' component={CreateNewDimentions} />
          <Route path='/matrix/c' component={EditorPage} />
          <Route path={`/matrix/:${PARAM_EDITOR_TEMPLATE}`} component={EditorPage} />
          <Route path='/select-template' exact component={ListTemplates} />

          <Redirect to="/select-template" />
        </Switch>
      </Layout>
    )
  }
}

export default App;