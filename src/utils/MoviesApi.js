class MoviesApi {
  constructor({
    baseUrl,
    headers
  }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this.baseUrl}`, {
      method: 'GET',
      headers: {...this.headers},
    })
      .then(this._getResponseData)
  }
}

const beatfilmMoviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-type": "application/json",
    'Accept': 'application/json',
  }
});

export default beatfilmMoviesApi;