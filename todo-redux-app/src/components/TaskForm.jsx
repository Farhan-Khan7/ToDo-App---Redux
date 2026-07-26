import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todos/todoSlice'
import { PRIORITIES, CATEGORIES } from '../constants'

function TaskForm() {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('')
  const [category, setCategory] = useState('')

  const resetForm = () => {
    setText('')
    setPriority('')
    setCategory('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || !priority || !category) return

    dispatch(addTodo({ text: trimmed, priority, category }))
    resetForm()
  }

  const fieldClass =
    'neu-inset w-full rounded-xl px-4 py-3 bg-transparent outline-none appearance-none'

  return (
    <div className="neu rounded-2xl p-6 md:p-8">
      <h2 className="mb-6 text-2xl font-bold" style={{ color: 'var(--accent)' }}>
        Create &amp; Manage Task
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-sm font-semibold">Task</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you have planned"
            className={fieldClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={fieldClass}
          >
            <option value="">Select Priority</option>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={fieldClass}
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="neu neu-btn mt-2 rounded-xl py-3 font-bold tracking-wide"
          style={{ color: 'var(--accent)' }}
        >
          ADD TASK
        </button>
      </form>
    </div>
  )
}

export default TaskForm
