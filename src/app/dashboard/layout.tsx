'use client'
import { ReactNode } from 'react'
import DashboardSidebar from '@/components/Dashboard/Sidebar'
import AuthGuard from '@/components/Auth/AuthGuard'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </AuthGuard>
  )
}
