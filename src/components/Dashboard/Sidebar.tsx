import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Favourite Services', path: '/dashboard/favorites' },
  { name: 'Order History', path: '/dashboard/orders' },
  { name: 'My Addresses', path: '/dashboard/addresses' },
  { name: 'Profile', path: '/dashboard/profile' },
  { name: 'Change Password', path: '/dashboard/change-password' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Customer Dashboard</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-2 rounded-lg ${
              pathname === item.path
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
