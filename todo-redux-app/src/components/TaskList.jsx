import { useSelector } from 'react-redux'
import { selectAllTodos } from '../features/todos/todoSlice'
import TaskItem from './TaskItem'

function TaskList({ filter = 'pending' }) {
  const todos = useSelector(selectAllTodos)
  const visibleTodos =
    filter === 'completed' ? todos.filter((t) => t.completed) : todos.filter((t) => !t.completed)

  if (visibleTodos.length === 0) {
    return (
      <p className="neu rounded-2xl py-10 text-center" style={{ color: 'var(--text-soft)' }}>
        {filter === 'completed'
          ? 'Abhi tak koi task complete nahi hua.'
          : 'Koi pending task nahi hai. Form se ek add karo!'}
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {visibleTodos.map((todo) => (
        <TaskItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export default TaskList
