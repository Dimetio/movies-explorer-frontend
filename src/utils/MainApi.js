export const BASE_URL = 'https://api.ddubinin.nomoredomains.xyz';

function checkResponse(res) {
  if(res.ok) {
    return res.json();
  }

  return res.json()
    .then((data) => {
      throw new Error(data.message)
    });
};

export const signup = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  })
  .then(checkResponse);
};

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  })
  .then(checkResponse);
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
  })
  .then(checkResponse);
};

export const getToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
  })
  .then(checkResponse);
};

export const updateProfile = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    body: JSON.stringify({ name, email })
  })
  .then(checkResponse);
}

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
  })
  .then(checkResponse);
}

export const saveMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    body: JSON.stringify({
      country: movie.country || 'не указано',
      director: movie.director || 'не указано',
      duration: movie.duration || 'не указано',
      year: movie.year || 'не указано',
      description: movie.description || 'не указано',
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink
        ? movie.trailerLink
        : `https://www.youtube.com/results?search_query=трейлер+${movie.nameRU}`,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU || movie.nameEN,
      nameEN: movie.nameEN || movie.nameRU,
    })
  })
  .then(checkResponse);
}

export const deleteMovie = (movie) => {
  return fetch(`${BASE_URL}/movies/${movie._id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
  })
  .then(checkResponse);
}