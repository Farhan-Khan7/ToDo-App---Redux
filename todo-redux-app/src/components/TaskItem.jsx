import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Pencil, Check, Trash2, X } from 'lucide-react'
import { deleteTodo, toggleTodo, updateTodo } from '../features/todos/todoSlice'
import { PRIORITIES, CATEGORIES } from '../constants'

function TaskItem({ todo }) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(todo.text)
  const [priority, setPriority] = useState(todo.priority)
  const [category, setCategory] = useState(todo.category)

  const fieldClass = 'neu-inset w-full rounded-xl bg-transparent px-3 py-2 outline-none'

  const handleSave = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    dispatch(updateTodo({ id: todo.id, text: trimmed, priority, category }))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setText(todo.text)
    setPriority(todo.priority)
    setCategory(todo.category)
    setIsEditing(false)
  }

  // Edit mode - task card ke andar hi text/priority/category edit hota hai
  if (isEditing) {
    return (
      <li className="neu flex flex-col gap-3 rounded-2xl p-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={fieldClass}
          autoFocus
        />
        <div className="flex gap-3">
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className={fieldClass}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={fieldClass}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="neu neu-btn flex-1 rounded-xl py-2 font-bold"
            style={{ color: 'var(--accent)' }}
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="neu neu-btn flex h-10 w-10 items-center justify-center rounded-xl"
            aria-label="Cancel edit"
          >
            <X size={16} />
          </button>
        </div>
      </li>
    )
  }

  // Normal display mode
  return (
    <li className="neu flex flex-wrap items-center gap-3 rounded-2xl p-4">
      <span
        className="min-w-[120px] flex-1 break-words font-medium"
        style={{
          color: todo.completed ? 'var(--text-soft)' : 'var(--text)',
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.text}
      </span>

      <span className="neu-sm rounded-full px-3 py-1 text-xs font-semibold" style={{ color: 'var(--accent)' }}>
        {todo.priority}
      </span>
      <span className="neu-sm rounded-full px-3 py-1 text-xs font-semibold">{todo.category}</span>

      {/* Completed tasks me edit ka option nahi aata */}
      {!todo.completed && (
        <button
          onClick={() => setIsEditing(true)}
          className="neu neu-btn flex h-9 w-9 items-center justify-center rounded-lg"
          aria-label="Edit task"
        >
          <Pencil size={16} />
        </button>
      )}

      <button
        onClick={() => dispatch(toggleTodo(todo.id))}
        className="neu neu-btn flex h-9 w-9 items-center justify-center rounded-lg"
        style={{ color: todo.completed ? '#22c55e' : 'var(--text)' }}
        aria-label="Toggle complete"
      >
        <Check size={16} />
      </button>

      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="neu neu-btn flex h-9 w-9 items-center justify-center rounded-lg text-red-500"
        aria-label="Delete task"
      >
        <Trash2 size={16} />
      </button>
    </li>
  )
}

export default TaskItem
