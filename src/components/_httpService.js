import axios from 'axios'

export default function (params) {
  let baseURL = ''
  if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://59.126.17.211:9001'
  } else {
    baseURL = 'http://localhost:3000'
  }

  const { method, header, url, auth, path, data } = params
  console.log(params)

  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    ...header
  }

  if (auth) {
    const user = JSON.parse(localStorage.getItem('user'))
    headers = {
      ...headers,
      'Authorization': user ? user.access_token : ''
    }
  }

  return axios({
    method: method || 'get',
    url: url || (baseURL + path),
    withCredentials: true,
    headers,
    data
  })
}
