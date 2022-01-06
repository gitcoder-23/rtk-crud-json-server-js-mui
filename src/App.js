import { Route, Switch } from 'react-router-dom';
import './App.css';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Home from './pages/Home';
import { ViewUser } from './pages/ViewUser';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/adduser" component={AddUser} />
        <Route exact path="/edituser/:userId" component={EditUser} />
        <Route exact path="/viewuser/:userId" component={ViewUser} />

        <Route exact path="*">
          404 Not Found!
        </Route>
      </Switch>
    </div>
  );
}

export default App;
