import { Moon, Sun, ClipboardList } from 'lucide-react'

const LINKS = [
  { key: 'home', label: 'Home' },
  { key: 'add', label: 'Add Task' },
  { key: 'completed', label: 'Completed Tasks' },
]

function Navbar({ activeView, setActiveView, darkMode, toggleDarkMode }) {
  return (
    <header className="neu mx-4 mt-4 flex items-center justify-between rounded-2xl px-5 py-4 md:mx-8 md:mt-6 md:px-8">
      <div className="flex items-center gap-2">
        <div
          className="neu-sm flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ color: 'var(--accent)' }}
        >
          <ClipboardList size={18} />
        </div>
        <span className="font-bold leading-tight">TaskNest</span>
      </div>

      <nav className="flex flex-wrap justify-center gap-3 md:gap-6">
        {LINKS.map((link) => (
          <button
            key={link.key}
            onClick={() => setActiveView(link.key)}
            className="text-xs font-semibold whitespace-nowrap md:text-sm"
            style={{
              color: activeView === link.key ? 'var(--accent)' : 'var(--text-soft)',
            }}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <button
        onClick={toggleDarkMode}
        className="neu neu-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  )
}

export default Navbar
