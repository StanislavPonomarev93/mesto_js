class MestoApi {
  constructor(options) {
    this.options = options;
  };
  getUserInfo = () => {
    return fetch(`${this.options.baseUrl}/users/me`, this.options.token)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  getInitialCards = () => {
    return fetch(`${this.options.baseUrl}/cards`, this.options.token)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  }
  sendUserInfo = (nameValue, aboutValue) => {
    return fetch(`${this.options.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.options.headers,
        body: JSON.stringify({
          name: nameValue,
          about: aboutValue
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  changeAvatar = (avatarValue) => {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.options.headers,
        body: JSON.stringify({
          avatar: avatarValue
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  addCard = (cardData) => {
    return fetch(`${this.options.baseUrl}/cards`, {
        method: 'POST',
        headers: this.options.headers,
        body: JSON.stringify(cardData)
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  deleteCard = (cardId) => {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.options.token.headers
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  setLike = (cardId) => {
    return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
        method: 'PUT',
        headers: this.options.token.headers
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  deleteLike = (cardId) => {
    return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
        method: 'DELETE',
        headers: this.options.token.headers
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
}