import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
// components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute  from '../ProtectedRoute/ProtectedRoute';
// contextes
import DisableComponentContext from '../../contexts/DisableComponent';
import CurrentUserContext from "../../contexts/CurrentUserContext"
// api
import beatfilmMoviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';


function toggleClassBody(isOpen) {
  document.body.classList.toggle('overflow-hidden', isOpen);
}

function App() {
  // флаг для бургера
  const [isOpen, setIsOpen] = useState(false);
  const [disableComponent, setDisableComponent] = useState({header: false, footer: false})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  // массив сохраненных фильмов
  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('saved-movies')) ?? []);
  // количество новых карточек
  const [numberOfNew, setNumberOfNew] = useState(0);
  // длина изначального массива фильмов
  const [moviesListLength, setMovieListLength] = useState(0);

  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const location = useLocation();
  // проверка токена
  function checkToken() {
    mainApi.getToken()
      .then((data) => {
        if (data) {
          setIsLoggedIn(true);
          setCurrentUser(data);
          navigate(location.pathname, { replace: true });
        } else {
          setIsLoggedIn(false);
          setCurrentUser({});
          localStorage.clear();
          navigate('/signin');
        }
      })
      .catch(err => console.log(err.message))
  }

  // регистрация
  function handleSignup(name, email, password) {
    return mainApi.signup(name, email, password)
      .then(() => {
        handleSignin(email, password);
      })
      .catch(err => console.log(err.message))
  }

  // вход
  function handleSignin(email, password) {
    return mainApi.signin(email, password)
      .then(() => {
        setIsLoggedIn(true);
        setCurrentUser(email, password);
        navigate('/movies', { replace: true })            
      })
      .catch(err => console.log(err.message)) 
  }

  // редактрование профиля
  function handleEditProfile({name, email}) {
    return mainApi.updateProfile(name, email)
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err.message))
  }

  // выход
  function handleSignout() {
    return mainApi.signout()
      .then(() => {
        setIsLoggedIn(false);
        setCurrentUser({});
        localStorage.clear();
        navigate('/', { replace: true });  
      })
      .catch(err => console.log(err.message))
  }

  // бургер/крестик
  function handleIconClick() {
    setIsOpen(!isOpen);

    toggleClassBody(!isOpen)
  }

  // сохраняю или удаляю фильм
  function handleMovieIconClick(movie) {
    const like = savedMovies.some((i) => i.movieId === movie.id);

    if (!like) {
      handleSaveMovie(movie);
    } else {
      const dislike = savedMovies.find((i) => i.movieId === movie.id);
      handleDeleteMovie(dislike);
    }
  }

  function handleSaveMovie(movie) {
    return mainApi.saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
        localStorage.setItem('saved-movies', JSON.stringify([...savedMovies, newMovie]));
      })
      .catch(err => console.log(err.message))
  }

  function handleDeleteMovie(movie) {
    return mainApi.deleteMovie(movie)
      .then(() => {
        const resultSavedMovie = savedMovies.filter((i) => i._id !== movie._id);

        setSavedMovies(resultSavedMovie);
        localStorage.setItem('saved-movies', JSON.stringify(resultSavedMovie));
      })
  }

  // обновляю стейт ширины экрана
  function updateWindowWidth() {
    setWidth(window.innerWidth);
  }

 // кнопка Ещё
  function getMoreMovies() {
    setMovieListLength(moviesListLength + numberOfNew);
  }

  // меняю вывод максимальное количество карточек
  useEffect(() => { 
    if(width >= 1140) {
      setNumberOfNew(3);
      setMovieListLength(12);
    } else if(width < 1140) {
      setNumberOfNew(2);
      setMovieListLength(8);
    } else if(width < 708) {
      setNumberOfNew(1);
      setMovieListLength(5);
    }
  }, [width]);

  // обрабытываю событие resize окна браузера
  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth)
  }, []);

  useEffect(() => {
    checkToken();
  }, [isLoggedIn])

  // при входе делаю запрос и сохраняю фильмы в localStorage
  useEffect(() => {
    if(isLoggedIn && savedMovies.length === 0) {
      mainApi.getSavedMovies()
      .then(savedMoviesList => {
        if(savedMoviesList) {
          localStorage.setItem('saved-movies', JSON.stringify(savedMoviesList));
          setSavedMovies(savedMoviesList);
        }
      })
      //.catch(() => setPretext('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'))
    }   
  }, [isLoggedIn, savedMovies.length]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <DisableComponentContext.Provider value={setDisableComponent}>
        <div className="App">
          <div className={`overlay ${isOpen && "overlay-show"}`}></div>
          <Header
            isLoggedIn={isLoggedIn}
            isOpen={isOpen}
            handleIconClick={handleIconClick}
            headerDisable={disableComponent.header}
          />
            <Routes>
              <Route 
                path="/movies"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                  >
                    <Movies
                      handleMovieIconClick={handleMovieIconClick} // обработчик по лайку
                      moviesListLength={moviesListLength} // сколько выводить фильмов
                      getMoreMovies={getMoreMovies} // обработчик кнопки ещё
                      savedMovies={savedMovies} // массив сох.фильмов, чтобы проставить лайку сразу
                    />
                  </ProtectedRoute>
                }
              />

              <Route 
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                  >
                    <SavedMovies
                      movies={savedMovies}
                      handleMovieIconClick={handleDeleteMovie}
                    />
                  </ProtectedRoute>                
                }
              />

              <Route 
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                  >
                    <Profile 
                      editProfile={handleEditProfile}
                      handleSignout={handleSignout}
                  />
                  </ProtectedRoute>
                }                
              />

              <Route 
                path="/signin"
                element={<Login signin={handleSignin} isLoggedIn={isLoggedIn}/>}
              />

              <Route 
                path="/signup"
                element={<Register signup={handleSignup} isLoggedIn={isLoggedIn}/>}
              />

              <Route 
                path="/"
                element={<Main />}
                exact
              />

              <Route 
                path="*"
                element={<NotFound />}
              />
            </Routes>
          <Footer 
            footerDisable={disableComponent.footer}
          />
        </div>
      </DisableComponentContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;