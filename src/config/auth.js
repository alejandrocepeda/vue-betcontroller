const ID_TOKEN_KEY = 'token'

export function isLoggedIn () {
  const idToken = getIdToken()
  setAxiosHeader()
  return !!idToken
}

export function getIdToken () {
  if(process.env.NODE_ENV === 'test'){
    return process.env.TEST_TOKEN
  }else {
    return sessionStorage.getItem(ID_TOKEN_KEY)
  }

}

export function noAuth (to, from, next) {
  if (isLoggedIn()) {
    next({
      path: '/'
    })
  } else {
    next()
  }
}

export function logout () {
  clearIdToken()
}

export function login (idToken) {
  sessionStorage.setItem(ID_TOKEN_KEY, idToken)
  setAxiosHeader()
}

function clearIdToken () {
  sessionStorage.removeItem(ID_TOKEN_KEY)
}

export function setAxiosHeader () {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getIdToken()
}
