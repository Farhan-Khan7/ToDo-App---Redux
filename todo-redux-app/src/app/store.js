import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todos/todoSlice'

const STORAGE_KEY = 'shery-todos'

// Refresh par data na khoye, isliye localStorage se initial state load karte hain
const loadTodosState = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY)
    if (serialized === null) return undefined
    return { todos: JSON.parse(serialized) }
  } catch (err) {
    // Corrupt data ya private-mode storage block - fresh state se start karo
    console.warn('Could not load todos from localStorage:', err)
    return undefined
  }
}

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: loadTodosState(),
})

// Jab bhi state change ho (add/update/delete/toggle), localStorage me save kar do
store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().todos))
  } catch (err) {
    console.warn('Could not save todos to localStorage:', err)
  }
})
