import { UserCircle, LogOut } from 'lucide-react'
import { getAuth, signOut } from 'firebase/auth'

function NavBar({ user, onSignInClick }) {
  const handleLogout = async () => {
    const auth = getAuth()
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout error:', error)
      alert('Failed to log out')
    }
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Survey Designer</h1>
          </div>
          <div className="flex items-center">
            {user?.isAnonymous ? (
              <button
                onClick={onSignInClick}
                className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                <UserCircle className="w-5 h-5 mr-2" />
                Sign In
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <span>{user?.email}</span>
                <UserCircle className="w-6 h-6" />
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar 