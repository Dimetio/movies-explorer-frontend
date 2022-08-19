export const BASE_URL = 'http://localhost:3001';

function checkResponce(res) {
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
  .then(checkResponce);
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
  .then(checkResponce);
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    'Content-Type': 'application/json',
    credentials: 'include',
  })
  .then(checkResponce);
};

export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  .then(checkResponce);
};