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
import EventPage from './pages/EventPage';
import UploadEventPoster from './pages/UploadEventPoster';
import MyEvents from './pages/user/MyEvents';
import Profile from './pages/user/Profile';
import BookEvents from './pages/BookEvents';
import MyTickets from './pages/user/MyTickets';
import Tickets from './pages/user/Tickets';
import AdminRoute from './routes/AdminRoute';
import AdminLogin from './pages/admin/AdminLogin';
import MonitorEvents from './pages/admin/MonitorEvents';

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
              <Route exact path="/event/:id" component={EventPage} />

              <PublicRoute exact path="/user/activate/:token" component={Activate}/>
              <PublicRoute exact path="/login" component={Login} />
              <PublicRoute exact path="/register" component={Register} />
              <PublicRoute exact path="/user/forgetpassword" component={ForgetPassword}/>
              <PublicRoute exact path="/user/resetpassword/:token" component={ResetPassword} />
              <PublicRoute exact path='/admin/login' component={AdminLogin}/> 

              <PrivateRoute exact path="/create" component={CreateEvent}/>
              <PrivateRoute exact path="/book/:id" component={BookEvents}/>
              <PrivateRoute exact path="/user/myevents/uploadposter/:id" component={UploadEventPoster} />
              <PrivateRoute exact path="/user/myevents" component={MyEvents}/>
              <PrivateRoute exact path="/user/profile" component={Profile}/>
              <PrivateRoute exact path="/user/mybookings" component={MyTickets}/>
              <PrivateRoute exact path="/tickets" component={Tickets}/>

              <AdminRoute exact path="/admin/events" component={MonitorEvents}/>

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
