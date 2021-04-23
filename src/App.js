import Homepage from './pages/Homepage';
import Login from './pages/Login'
import Register from './pages/Register';
import Activate from './pages/Activate';
import About from './pages/About';
import CreateEvent from './pages/Create/CreateEvent';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './routes/PrivateRoute';
import './App.css';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'


function App() {
  //TODO: add user activation forgot password routes
  return (
    <div>
      <Router>
        <Navbar/>
        <Switch>

          <Route exact path="/" component={Homepage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/about" component={About}/>  
          <Route exact path="/user/activate/:token" component={Activate}/>
          <PrivateRoute exact path="/create" component={CreateEvent}/>

          <Route exact path="*" >
            <Redirect to="/" />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
