import { useSelector } from 'react-redux'
import { selectAllTodos } from '../features/todos/todoSlice'

function Dashboard() {
  const todos = useSelector(selectAllTodos)
  const total = todos.length
  const completed = todos.filter((t) => t.completed).length
  const pending = total - completed

  const stats = [
    { label: 'Total Task', value: total },
    { label: 'Completed Task', value: completed },
    { label: 'Pending Task', value: pending },
  ]

  return (
    <div className="neu rounded-2xl p-6 md:p-8">
      <h2 className="mb-5 text-2xl font-bold" style={{ color: 'var(--accent)' }}>
        Dashboard
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="neu-sm rounded-xl p-4 text-center">
            <p className="mb-2 text-xs font-semibold md:text-sm" style={{ color: 'var(--text-soft)' }}>
              {stat.label}
            </p>
            <p className="text-2xl font-bold md:text-3xl" style={{ color: 'var(--accent)' }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
