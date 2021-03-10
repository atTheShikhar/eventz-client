import Homepage from './Pages/Homepage';
import Login from './Pages/Login'
import Register from './Pages/Register';
import About from './Pages/About';
import Navbar from './components/Navbar/Navbar';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Switch>

          <Route exact path="/">
            <Homepage/>
          </Route>

          <Route path="/Login">
            <Login/>
          </Route>

          <Route path="/Register">
            <Register/>
          </Route>

          <Route path="/About">
            <About/>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
