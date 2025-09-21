import { ReactNode } from 'react'
import DashboardSidebar from '@/components/Dashboard/Sidebar'
import { TokenValidation } from '@/utils/tokenValidation'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const isAuthenticated = await TokenValidation.checkAuth()
  
  if (!isAuthenticated) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
