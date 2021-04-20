import Homepage from './pages/Homepage';
import Login from './pages/Login'
import Register from './pages/Register';
import About from './pages/About';
import CreateEvent from './pages/Create/CreateEvent';
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

          <Route exact path="/" component={Homepage}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/about" component={About}/>
          <Route path="/create" component={CreateEvent}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
