const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || []
}

const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const removeStorage = (key, value) => {
  const getResponse = getStorage(key)
  const newStorage = getResponse.filter(e => e.id !== value)
  setStorage(key, newStorage)
  return newStorage
}

export {
  getStorage,
  setStorage,
  removeStorage,
}