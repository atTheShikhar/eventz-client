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
import TicketPage from './pages/user/TicketPage';
import AdminRoute from './routes/AdminRoute';
import AdminLogin from './pages/admin/AdminLogin';
import MonitorEvents from './pages/admin/MonitorEvents';
import ContactUs from './pages/ContactUs';
import Messages from './pages/admin/Messages';
import MessagePage from './pages/admin/MessagePage';
import ChangePassword from './pages/user/ChangePassword';
import MonitorUsers from './pages/admin/MonitorUsers';
import CustomDialog from './components/feedback/CustomDialog';
import UserPage from './pages/admin/UserPage';
import SendEmail from './pages/admin/SendEmail';
import EventInfoPage from './pages/user/EventInfoPage';
import AdminEventPage from './pages/admin/AdminEventPage';
import MonitorPayments from './pages/admin/MonitorPayments';
import { useContext } from 'react';
import { UserContext } from './context/Context';
import PaymentDetailsPage from './pages/admin/PaymentDetailsPage';
import VerifyTickets from './pages/user/VerifyTickets';
import Bookings from './pages/admin/Bookings';

axios.defaults.withCredentials = true;

function App() {
  const {user} = useContext(UserContext);

  return (
    <div>
        <Router>
            <GenericSnackbar/>
            <CustomDialog/>
            <Navbar/>

            <Switch>
              <Route exact path="/" component={Homepage}/>
              <Route exact path="/neterr" component={NetError} />
              <Route exact path="/about" component={About}/>
              <Route exact path="/browse" component={BrowseEvents}/>
              <Route exact path="/event/:id" component={EventPage} />
              <Route exact path="/contactus" component={ContactUs} />

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
              <PrivateRoute exact path="/user/myevent/:id" component={EventInfoPage}/>
              <PrivateRoute exact path="/user/profile" component={Profile}/>
              <PrivateRoute exact path="/user/changepassword" component={ChangePassword}/>
              <PrivateRoute exact path="/user/mybookings" component={MyTickets}/>
              <PrivateRoute exact path="/user/tickets/:id" component={TicketPage}/>
              <PrivateRoute exact path="/user/verifytickets/:eventId" component={VerifyTickets}/>

              <AdminRoute exact path="/admin/events" component={MonitorEvents} />
              <AdminRoute exact path="/admin/event/:id" component={AdminEventPage} />
              <AdminRoute exact path="/admin/event/bookings/:id" component={Bookings} />
              <AdminRoute exact path="/admin/messages" component={Messages} /> 
              <AdminRoute exact path="/admin/message/:id" component={MessagePage} /> 
              <AdminRoute exact path="/admin/users" component={MonitorUsers} /> 
              <AdminRoute exact path="/admin/user/:id" component={UserPage} /> 
              <AdminRoute exact path="/admin/payments" component={MonitorPayments} /> 
              <AdminRoute exact path="/admin/payment/details" component={PaymentDetailsPage} /> 
              <AdminRoute exact path="/admin/sendemail" component={SendEmail} /> 

                {
                (user?.type === 'admin') ? 
                  (<Route exact path="*" >
                    <Redirect to="/admin/events"/>
                  </Route>) :
                  (<Route exact path="*">
                    <Redirect to="/" />
                  </Route>)  
                }

            </Switch>
        </Router>
    </div>
  );
}

export default App;
