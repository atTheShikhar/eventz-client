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
import CreateEvent from './Pages/Create/CreateEvent';

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
