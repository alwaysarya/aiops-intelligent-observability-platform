import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'
import CommandPalette from '../Premium/CommandPalette'
import ToastContainer from '../Premium/Toast'
import AIChatbot from '../Premium/AIChatbot'

function Layout() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <CommandPalette />
      <Topbar />
      <main className="flex-1 w-full relative bg-ink-bg">
        <Outlet />
      </main>
      <ToastContainer />
      <AIChatbot />
    </div>
  )
}

export default Layout
