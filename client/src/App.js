import './App.css';

import {useState, useContex, createContext} from 'react';
import {Route, Routes} from 'react-router-dom';

import First from './components/first/First';
import Login from './components/RegistrationLogin/Login';
import Registration from './components/RegistrationLogin/Registration';
import Page from './components/ReadBook/Page'
import BookSelection from './components/book_selection/BookSelection';
import Authorization from './components/authorization/Authorization';
import Nav from './components/navigation/Nav';

export const AuthContext = createContext();


function App() {
  const [token, setToken] = useState();
  const [user_id, setUser_id] = useState();
  return (
    <AuthContext.Provider value={{token, setToken, user_id, setUser_id}}>
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<First/>}/>
        <Route path="/select" element={<Authorization><BookSelection/></Authorization>}/>
        <Route path="/book/:bookId/:page" element={<Authorization><Page/></Authorization>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Registration/>}/>
      </Routes>

    </div>
    </AuthContext.Provider>
  );
}

export default App;
