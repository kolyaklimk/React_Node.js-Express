import { createContext } from 'react'

function noop() { }

export const AuthContext = createContext({
    token: null,
    _id: null,
    isAdmin: false,
    login: noop,
    logout: noop,
    isAuthenticated: false
})