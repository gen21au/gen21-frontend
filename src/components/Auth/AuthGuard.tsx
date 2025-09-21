'use client'

import { useState, ReactNode } from 'react'
// import { TokenValidation } from '@/utils/tokenValidation'
import { redirect } from 'next/navigation'
import { RootState, useAppSelector } from '@/store/store'

interface AuthGuardProps {
  children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  // if (loading) {
  //   return <div className="flex justify-center items-center min-h-screen">Loading authentication...</div>
  // }

  if (!isAuthenticated) {
    redirect('/login')
    return null // Should not be reached due to redirect
  }

  return <>{children}</>
}
