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

  _headersWithJwt() {
    return {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this.headers}
  }

  getMovies() {
    return fetch(`${this.baseUrl}`, {
      headers: this._headersWithJwt(),
    })
      .then(this._getResponseData)
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-type": "application/json",
    'Accept': 'application/json',
  }
});

export default moviesApi;