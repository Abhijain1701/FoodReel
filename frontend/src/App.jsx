import React from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { UserAuthProvider } from './context/UserAuthContext'

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserAuthProvider>
          <AppRoutes />
        </UserAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
