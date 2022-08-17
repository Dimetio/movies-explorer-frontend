import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

import DisableComponentContext from '../../contexts/DisableComponent';

function toggleClassBody(isOpen) {
  document.body.classList.toggle('overflow-hidden', isOpen);
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [disableComponent, setDisableComponent] = useState({header: false, footer: false})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: "Dmitry", email: "ddubinin.dmitry@mail.ru"})

  function handleSignup(name, email, password) {
    setIsLoggedIn(true);
    setCurrentUser({
      name,
      email
    });
  }

  function handleSignin({name, email}) {
    setIsLoggedIn(true);
    setCurrentUser({ name, email })
  }

  function handleIconClick() {
    setIsOpen(!isOpen);

    toggleClassBody(!isOpen)
  }

  return (
    <DisableComponentContext.Provider value={setDisableComponent}>
      <div className="App">
        <div className={`overlay ${isOpen && "overlay-show"}`}></div>
        <Header 
          isOpen={isOpen}
          handleIconClick={handleIconClick}
          headerDisable={disableComponent.header}
        />
          <Routes>
            <Route 
              path="/movies"
              element={<Movies />}
            />

            <Route 
              path="/saved-movies"
              element={<SavedMovies />}
            />

            <Route 
              path="/profile"
              element={<Profile />}
            />

            <Route 
              path="/signin"
              element={<Login signin={handleSignin}/>}
            />

            <Route 
              path="/signup"
              element={<Register signup={handleSignup}/>}
            />

            <Route 
              path="/404"
              element={<NotFound />}
            />

            <Route 
              path="/"
              element={<Main />}
              exact
            />
          </Routes>
        <Footer 
          footerDisable={disableComponent.footer}
        />
      </div>
    </DisableComponentContext.Provider>
  );
}

export default App;