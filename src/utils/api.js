class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
  }

  // принемает endpoint(то что идет после главного url/...), метод (метод 'get, post ...') и тело, если есть
  _request(endpoint, method, body) {
    const fetchInit = {
      method: method,
      headers: this._headers
    }

    return fetch(`${this._url}/${endpoint}`,
    body 
    ? { // если есть тело запроса body
        ...fetchInit, //добавляем то что уже есть
        body: JSON.stringify(body) // а это идет плюсом
      }
    : fetchInit) // // если нет  body в запросе, то возвращается только константа fetchInit
    .then(this._handleResponse)
  }

  //получаем инфо пользователя
  getUserInfo() {
    return this._request('users/me','GET')

    // return fetch(`${this._url}/users/me`, {
    //   headers: this._headers,
    //   method: 'GET',
    //   })
    //   .then(this._handleResponse)
  }

  //получаем карточки
  getCards() {
    return this._request('cards', 'GET')
    
    /* fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'GET',
      })
      .then(this._handleResponse) */
  }

  //редактирование профиля
  editProfile(profile) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(profile),
      })
      .then(this._handleResponse)
  }

  //редактирование аватара
  editProfileAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(avatar),
      })
      .then(this._handleResponse)
  }

  //создание карточки
  createCard(card) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(card),
      })
      .then(this._handleResponse)
  }

  //удаление карточки
  deleteCardApi(id) {
    return this._request(`cards/${id}`, 'DELETE')
    
    /* fetch(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
      })
      .then(this._handleResponse) */
  }

  // добавление лайка
  addLikes(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
      })
      .then(this._handleResponse)
  }

  //удаление лайка
  deleteLikes(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: "DELETE",
      })
      .then(this._handleResponse)
  }
}
const api = new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: '94d1ffee-3999-4573-85f3-6adc0420e1b3',
    'Content-Type': 'application/json'
  }
});

export default api;