import { atom } from 'recoil'

export const BACKEND_URL = atom({
    key: 'backendUrl',
    default: 'http://localhost:3000',
})
