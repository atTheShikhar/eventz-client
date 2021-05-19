import Homepage from './pages/Homepage';
import Login from './pages/Login'
import Register from './pages/Register';
import Activate from './pages/Activate';
import About from './pages/About';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import Navbar from './components/navbar/Navbar';
import CreateEvent from './pages/Create/CreateEvent';
import NetError from './components/NetError';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import GlobalState from './context/GlobalState';
import GenericSnackbar from './components/feedback/snackbar';
import './App.css';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import axios from 'axios';
import BrowseEvents from './pages/BrowseEvents';

axios.defaults.withCredentials = true;

function App() {
  

  return (
    <div>
        <Router>
          <GlobalState>

            <GenericSnackbar/>

            <Navbar/>

            <Switch>
              <Route exact path="/" component={Homepage}/>
              <Route exact path="/neterr" component={NetError} />
              <Route exact path="/about" component={About}/>
              <Route exact path="/browse" component={BrowseEvents}/>

              <PublicRoute exact path="/user/activate/:token" component={Activate}/>
              <PublicRoute exact path="/login" component={Login} />
              <PublicRoute exact path="/register" component={Register} />
              <PublicRoute exact path="/user/forgetpassword" component={ForgetPassword}/>
              <PublicRoute exact path="/user/resetpassword/:token" component={ResetPassword} />

              <PrivateRoute exact path="/create" component={CreateEvent}/>

              <Route exact path="*" >
                <Redirect to="/" />
              </Route>
            </Switch>
            
          </GlobalState>
        </Router>
    </div>
  );
}

export default App;
