'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AdminAuthProps {
  children: React.ReactNode
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const authenticated = localStorage.getItem('adminAuthenticated')
      const loginTime = localStorage.getItem('adminLoginTime')
      
      if (authenticated === 'true' && loginTime) {
        // Check if login is still valid (24 hours)
        const loginDate = new Date(loginTime)
        const now = new Date()
        const hoursSinceLogin = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)
        
        if (hoursSinceLogin < 24) {
          setIsAuthenticated(true)
        } else {
          // Session expired
          localStorage.removeItem('adminAuthenticated')
          localStorage.removeItem('adminLoginTime')
          router.push('/admin/login')
        }
      } else {
        router.push('/admin/login')
      }
      
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    localStorage.removeItem('adminLoginTime')
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Router will handle redirect
  }

  return (
    <div>
      {/* Admin Header with Logout */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Quiz Management System</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Logged in as Admin
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {children}
    </div>
  )
} 