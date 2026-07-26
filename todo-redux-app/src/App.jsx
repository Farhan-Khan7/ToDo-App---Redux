import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Dashboard from './components/Dashboard'

function App() {
  const [activeView, setActiveView] = useState('home')

  // Dark mode preference bhi localStorage me save hota hai
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('shery-theme') === 'dark'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('shery-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className="relative h-screen pb-10" style={{ background: 'var(--bg)' }}>
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      {/* items-start - grid columns ek dusre ki height ke hisab se stretch nahi karte,
          isliye form ki height list ke saath badhti nahi hai */}
      <main className="grid grid-cols-1 items-start gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-8">
        <TaskForm />

        <div className="flex flex-col gap-6">
          {activeView === 'completed' ? (
            <div className="max-h-[70vh] overflow-y-auto overflow-x-hidden pr-1">
              <TaskList filter="completed" />
            </div>
          ) : (
            <>
              <Dashboard />
              <div className="max-h-[55vh] overflow-y-auto overflow-x-hidden pr-1">
                <TaskList filter="pending" />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
