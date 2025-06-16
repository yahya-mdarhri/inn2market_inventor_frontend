import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold">
                Inventor
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-secondary px-3 py-2 rounded-md">
                Home
              </Link>
              <Link to="/about" className="hover:text-secondary px-3 py-2 rounded-md">
                About
              </Link>
              <Link to="/contact" className="hover:text-secondary px-3 py-2 rounded-md">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-primary text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center">© 2024 Inventor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout 