import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import './App.css'
import SurveyDesigner from './components/SurveyDesigner'
import NavBar from './components/NavBar'
import SignIn from './components/SignIn'
import './firebase'

function App() {
  const [user, setUser] = useState(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        signInAnonymously(auth)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar user={user} onSignInClick={() => setShowSignIn(true)} />
      {showSignIn && (
        <SignIn onClose={() => setShowSignIn(false)} />
      )}
      <SurveyDesigner />
    </div>
  )
}

export default App
