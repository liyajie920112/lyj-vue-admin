const key = 'exam-token'
export function setToken(token) {
  sessionStorage.setItem(key, token)
}

export function getToken() {
  const t = sessionStorage.getItem(key)
  return t === 'undefined' ? '' : t
}

export function removeToken() {
  sessionStorage.removeItem(key)
}

export function clear() {
  sessionStorage.clear()
}
