import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/home/Home'
import Settings from './pages/settings/Settings'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import FetchData from './pages/settingsoptions/FetchData'
import Store from './pages/store/Store'
import OnlineUsers from './components/OnlineUsers'
import ForgotPassword from './pages/forgotpassword/ForgotPassword'
// styles
import './App.css'
function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
        {user && <Sidebar />}
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Home />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route path="/signup">
              {user && user.displayName && <Redirect to="/" />}
              {!user && <Signup />}
            </Route>
            <Route exact path="/forgotpassword">
              {user && <Redirect to="/login" />}
              {!user && <ForgotPassword/>}
            </Route>
            <Route exact path="/store">
              {!user && <Redirect to="/login" />}
              {user && <Store/>}
            </Route>
            <Route exact path="/settings">
              {!user && <Redirect to="/login" />}
              {user && <Settings/>}
            </Route>
            <Route exact path="/settings/updateinfo">
              {!user && <Redirect to="/login" />}
              {user && <FetchData/>}
            </Route>
          </Switch>
          </div>
          {user && <OnlineUsers/>}
        </BrowserRouter>
      )}
    </div>
    
  );
}

export default App
