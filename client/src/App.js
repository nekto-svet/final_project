import './App.css';

import {useState, useContex, createContext} from 'react';
import {Route, Routes} from 'react-router-dom';

import First from './components/first/First';
import Login from './components/RegistrationLogin/Login';
import Registration from './components/RegistrationLogin/Registration';
import Page from './components/ReadBook/Page'
import BookSelection from './components/book_selection/BookSelection';
import Authorization from './components/authorization/Authorization';
import Redirect from './components/authorization/Redirect';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

export const AuthContext = createContext();


function App() {
  const [token, setToken] = useState();
  const [user_id, setUser_id] = useState();
  return (
    <AuthContext.Provider value={{token, setToken, user_id, setUser_id}}>
    <div className="App">
      <Routes>
        <Route path="/" element={<Redirect><First/></Redirect>}/>
        <Route path="/select" element={<Authorization><ErrorBoundary><BookSelection/></ErrorBoundary></Authorization>}/>
        <Route path="/book/:bookId/:page" element={<Authorization><Page/></Authorization>}/>
        <Route path='/login' element={<Redirect><Login/></Redirect>}/>
        <Route path='/register' element={<Redirect><Registration/></Redirect>}/>
      </Routes>

    </div>
    </AuthContext.Provider>
  );
}

export default App;
