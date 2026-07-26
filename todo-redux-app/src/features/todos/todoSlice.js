import { createSlice, nanoid } from '@reduxjs/toolkit'

// Initial state - ek array of todo objects
const initialState = {
  items: [],
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // ADD - naya task add karna
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload)
      },
      // prepare callback - id generate karne ke liye (best practice)
      prepare: ({ text, priority, category }) => ({
        payload: {
          id: nanoid(),
          text,
          priority,
          category,
          completed: false,
        },
      }),
    },

    // UPDATE - existing task ka text/priority/category edit karna
    updateTodo: (state, action) => {
      const { id, text, priority, category } = action.payload
      const todo = state.items.find((item) => item.id === id)
      if (todo) {
        todo.text = text
        todo.priority = priority
        todo.category = category
      }
    },

    // DELETE - task hatana
    deleteTodo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },

    // TOGGLE - complete/incomplete mark karna
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
})

export const { addTodo, updateTodo, deleteTodo, toggleTodo } = todoSlice.actions

// Selector - component se state read karne ke liye
export const selectAllTodos = (state) => state.todos.items

export default todoSlice.reducer
