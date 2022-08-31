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
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) ?? []);
  // массив сохраненных фильмов
  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('saved-movies')) ?? []);
  // массив фильтрованных фильмов 
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filtered-movies')) ?? []);
  const [filterSavedMovies, setFilterSavedMovies] = useState(JSON.parse(localStorage.getItem('filtered-saved-movies')) ?? []);
  // количество новых карточек
  const [numberOfNew, setNumberOfNew] = useState(0);
  // длина изначального массива фильмов
  const [moviesListLength, setMovieListLength] = useState(0);
  const [pretext, setPretext] = useState('Введите название фильма в поисковой строке');
  const [isLoading, setIsLoading] = useState(false);

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
          navigate(location.pathname);
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
        setFilterSavedMovies([...filterSavedMovies, newMovie]);
        localStorage.setItem('saved-movies', JSON.stringify([...savedMovies, newMovie]));
        localStorage.setItem('filtered-saved-movies', JSON.stringify([...filterSavedMovies, newMovie]));
      })
      .catch(err => console.log(err.message))
  }

  function handleDeleteMovie(movie) {
    return mainApi.deleteMovie(movie)
      .then(() => {
        const resultSavedMovie = savedMovies.filter((i) => i._id !== movie._id);
        const resultFilteredSavedMovie = filterSavedMovies.filter((i) => i._id !== movie._id);

        setSavedMovies(resultSavedMovie);
        setFilterSavedMovies(resultFilteredSavedMovie);
        localStorage.setItem('saved-movies', JSON.stringify(resultSavedMovie));
        localStorage.setItem('filtered-saved-movies', JSON.stringify(resultFilteredSavedMovie));
      })
  }

  function filterMovies(movies, value) {
    return movies.filter((item) => {
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
  }

  function filterAndStoreMovies(movies, value) {
    const filtered = filterMovies(movies, value)

    // если поиск ничего не выдал
    if(filtered.length === 0) {
      setPretext('Ничего не найдено');
    }

    localStorage.setItem('filtered-movies', JSON.stringify(filtered));
    setFilteredMovies(filtered);
  }

  // поиск по фильмам
  function handleSearchMovies(value) {
    // если фильмов нет в хранилище - обращаюсь к апи
    if(movies.length === 0) {
      setIsLoading(true);
      beatfilmMoviesApi.getMovies()
        .then(moviesList => {
          if(moviesList.length) {
            localStorage.setItem('movies', JSON.stringify(moviesList));
            setMovies(moviesList);
            filterAndStoreMovies(moviesList, value);
          }
        })
        .catch(() => setPretext('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'))
        .finally(() => setIsLoading(false))
    } else {
      filterAndStoreMovies(movies, value)
    }
  }

   // сортировка по длине фильмов
   function handleDurationSwitch(checked) {
    const filteredMovies = JSON.parse(localStorage.getItem('filtered-movies'));

    if(checked && filteredMovies) {
      const shortMovies = filteredMovies.filter((item) => item.duration <= 40);
      localStorage.setItem('filtered-movies', JSON.stringify(shortMovies));
      setFilteredMovies(shortMovies);
    } else {
      setFilteredMovies(filteredMovies);
    }
  }

  // поиск по сохраненным фильмам
  function handleSearchSavedMovies(value) {
    const filterSavedMovie = filterMovies(savedMovies, value)

    // если поиск ничего не выдал
    if(filterSavedMovie.length === 0) {
      setPretext('Ничего не найдено');
    }

    localStorage.setItem('filtered-saved-movies', JSON.stringify(filterSavedMovie));
    setFilterSavedMovies(filterSavedMovie);
  }

  // сортировка по длине сохраненных фильмов
  function handleDurationSavedSwitch(checked) {
    const filterSavedMovies = JSON.parse(localStorage.getItem('filtered-saved-movies'));

    if(checked && filterSavedMovies) {
      const shortMovies = filterSavedMovies.filter((item) => item.duration <= 40);
      localStorage.setItem('filtered-saved-movies', JSON.stringify(shortMovies));
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
  });

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
          if(filterSavedMovies.length === 0) {
            localStorage.setItem('filtered-saved-movies', JSON.stringify(savedMoviesList));
            setFilterSavedMovies(savedMoviesList)
          }
        }
      })
      .catch(() => setPretext('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'))
    }   
  }, [filterSavedMovies.length, isLoggedIn, savedMovies.length]);

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
                      movies={filteredMovies}
                      handleMovieIconClick={handleMovieIconClick} // обработчик по лайку
                      moviesListLength={moviesListLength} // сколько выводить фильмов
                      getMoreMovies={getMoreMovies} // обработчик кнопки ещё
                      handleSearch={handleSearchMovies} // обработчик поиска
                      durationSwitch={handleDurationSwitch} // обработчик чекбокса
                      savedMovies={savedMovies} // массив сох.фильмов, чтобы проставить лайку сразу
                      pretext={pretext} // сообщение на месте карточек
                      isLoading={isLoading} // для прелоадера
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
                      durationSwitch={handleDurationSavedSwitch}
                      pretext={pretext}
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