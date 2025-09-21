'use client'

import { useEffect, useState, ReactNode } from 'react'
import { TokenValidation } from '@/utils/tokenValidation'
import { redirect } from 'next/navigation'

interface AuthGuardProps {
  children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuthentication = async () => {
      const authStatus = await TokenValidation.checkAuth()
      setIsAuthenticated(authStatus)
      setLoading(false)
    }
    checkAuthentication()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading authentication...</div>
  }

  if (!isAuthenticated) {
    redirect('/login')
    return null // Should not be reached due to redirect
  }

  return <>{children}</>
}
