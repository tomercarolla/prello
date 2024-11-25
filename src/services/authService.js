import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const authService = {
  login,
  signup,
  logout,
  getLoggedinUser,
  saveLocalUser,
}

async function login(credentials) {
  try {
    const user = await httpService.post('auth/login', credentials)
    return saveLocalUser(user)
  } catch (err) {
    console.error('Failed to login:', err)
    throw new Error('Failed to login')
  }
}

async function signup(credentials) {
  try {
    const user = await httpService.post('auth/signup', credentials)
    return saveLocalUser(user)
  } catch (err) {
    console.error('Failed to signup:', err)
    throw new Error('Failed to signup')
  }
}

async function logout() {
  try {
    await httpService.post('auth/logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  } catch (err) {
    console.error('Failed to logout:', err)
    throw new Error('Failed to logout')
  }
}

function saveLocalUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    isAdmin: user.isAdmin,
  };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
  return userToSave
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}
