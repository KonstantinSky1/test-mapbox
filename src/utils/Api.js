class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  get _headers() {
    return {
      'Content-Type': 'application/json',
    }
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getTestContent() {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._getResponse(res));
  }
}

const api = new Api({
  baseUrl: 'https://jsonplaceholder.typicode.com/posts'
});

export default api;