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


  //получаем инфо пользователя
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'GET',
      })
      .then(this._handleResponse)
  }

  //получаем карточки
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'GET',
      })
      .then(this._handleResponse)
  }

  //редактирование профиля
  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({name: data.name, about: data.about}),
      })
      .then(this._handleResponse)
  }

  //редактирование аватара
  editProfileAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: data.avatar }),
      })
      .then(this._handleResponse)
  }

  //создание карточки
  createCard(item) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({name: item.name, link: item.link}),
      })
      .then(this._handleResponse)
  }

  //удаление карточки
  deleteCardApi(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
      })
      .then(this._handleResponse)
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