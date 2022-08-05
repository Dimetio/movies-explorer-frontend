import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';

function App() {
  return (
    <div className="App">
      <Header />

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
          element={<Login />}
        />

        <Route 
          path="/signup"
          element={<Register />}
        />

        <Route 
          path="/"
          element={<Main />}
          exact
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;