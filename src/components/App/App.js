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
  // массив фильмов
  const [movies, setMovies] = useState([]);
  // массив сохраненных фильмов
  const [savedMovies, setSavedMovies] = useState([]);
  // массив фильтрованных фильмов 
  const [filterMovies, setFilterMovies] = useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = useState([]);
  // количество новых карточек
  const [numberOfNew, setNumberOfNew] = useState(0);
  // длина изначального массива фильмов
  const [moviesListLength, setMovieListLength] = useState(0);

  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const location = useLocation();

  // проверка токена
  function tokenCheck() {
    mainApi.getToken()
      .then((data) => {
        if (data) {
          setIsLoggedIn(true);
          setCurrentUser(data)
          navigate(location.pathname)
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(err => console.log(err.message))
  }

  // регистрация
  function handleSignup({name, email, password}) {
    return mainApi.signup(name, email, password)
      .then(() => {
        navigate('/signin', { replace: true });
      })
      .catch(err => console.log(err.message))
  }

  // вход
  function handleSignin({email, password}) {
    return mainApi.signin(email, password)
      .then(() => {
        tokenCheck();
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
        setCurrentUser({});
        localStorage.removeItem('movies');
        navigate('/signin', { replace: true });  
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
    const like = savedMovies.some((i) => {
      return i.movieId === movie.id
    });

    if (!like) {
      handleSaveMovie(movie);
    } else {
      const dislike = savedMovies.find((i) => i.movieId === movie.id)
      handleDeleteMovie(dislike);
    }
  }

  function handleSaveMovie(movie) {
    return mainApi.saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
        newMovie.isLiked = true;
        console.log('Фильм добавил');
      })
      .catch(err => console.log(err.message))
  }

  function handleDeleteMovie(movie) {
    return mainApi.deleteMovie(movie)
      .then(() => {
        setSavedMovies(savedMovies.filter((i) => i._id !== movie._id));
        console.log('Удалили фильм')
      })
  }

  // поиск по фильмам
  function handleSearchMovies(value) {
    const filterMovie = movies.filter((item) => {
      const values = value.toLowerCase();
      const nameEN = item.nameEN;
      const nameRU = item.nameRU;
      // не пустое значение и нашел EN или RU
      return (
        (values !== '' && 
          (
            (nameEN && nameEN.toLowerCase().includes(values)) || 
            (nameRU && nameRU.toLowerCase().includes(values))
          )
        ) ? item : null
      )
    });
    localStorage.setItem('filtered-movies', JSON.stringify(filterMovie));
    setFilterMovies(filterMovie);
  }

  // поиск по сохраненным фильмам
  function handleSearchSavedMovies(value) {
    const filterSavedMovie = savedMovies.filter((item) => {
      const values = value.toLowerCase();
      const nameEN = item.nameEN;
      const nameRU = item.nameRU;
      // не пустое значение и нашел EN или RU
      return (
        (values !== '' && 
          (
            (nameEN && nameEN.toLowerCase().includes(values)) || 
            (nameRU && nameRU.toLowerCase().includes(values))
          )
        ) ? item : null
      )
    });
    localStorage.setItem('filtered-saved-movies', JSON.stringify(filterSavedMovie));
    setFilterSavedMovies(filterSavedMovie.length > 0 ? filterSavedMovie : savedMovies);
  }

  // сортировка по длине фильмов
  function durationSwitch(checked) {
    const filterMovies = JSON.parse(localStorage.getItem('filtered-movies'));

    if(checked && filterMovies) {
      const shortMovies = filterMovies.filter((item) => item.duration <= 40);
      setFilterMovies(shortMovies);
    } else {
      setFilterMovies(filterMovies);
    }
  }

  // сортировка по длине сохраненных фильмов
  function durationSavedSwitch(checked) {
    const filterSavedMovies = JSON.parse(localStorage.getItem('filtered-saved-movies'));
    if(checked && filterSavedMovies) {
      const shortMovies = filterSavedMovies.filter((item) => item.duration <= 40);
      setFilterSavedMovies(shortMovies);
    } else {
      setFilterSavedMovies(filterSavedMovies);
    }
  }

  // обновляю стейт ширины экрана
  function updateWindowWidth() {
    setWidth(window.innerWidth);
  }

 // кнопка Ещё
  function moreMovies() {
    setMovieListLength(moviesListLength + numberOfNew);
  }

  // меняю вывод максимальное количество карточек
  useEffect(() => {
    if(width >= 1200) {
      setNumberOfNew(3);
      setMovieListLength(12);
    } else if(width >= 641 && width <= 1279) {
      setNumberOfNew(2);
      setMovieListLength(8);
    } else if(width <= 640) {
      setNumberOfNew(1);
      setMovieListLength(5);
    }
  }, [width]);

  // обрабытываю событие resize окна браузера
  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth)
  });

  useEffect(() => {
    tokenCheck();
  }, [])

  // при входе делаю запрос и сохраняю фильмы в localStorage
  useEffect(() => {
    if(isLoggedIn) {
      Promise.all([beatfilmMoviesApi.getMovies(), mainApi.getSavedMovies()])
      .then(([moviesList, savedMoviesList]) => {
        if(moviesList) {
          localStorage.setItem('movies', JSON.stringify(moviesList));
          const localMovies = JSON.parse(localStorage.getItem('movies'));
          setMovies(localMovies);
        }
        
        if(savedMoviesList) {
          setSavedMovies(savedMoviesList);
          setFilterSavedMovies(savedMoviesList)
        }
      })
      .catch((err) => console.log(err))
    }   
  }, [isLoggedIn]);

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
                      movies={filterMovies}
                      handleMovieIconClick={handleMovieIconClick}
                      moviesListLength={moviesListLength}
                      moreMovies={moreMovies}
                      handleSearch={handleSearchMovies}
                      durationSwitch={durationSwitch}
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
                      movies={filterSavedMovies}
                      handleMovieIconClick={handleDeleteMovie}
                      handleSearch={handleSearchSavedMovies}
                      durationSwitch={durationSavedSwitch}
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
                element={<Login signin={handleSignin}/>}
              />

              <Route 
                path="/signup"
                element={<Register signup={handleSignup}/>}
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