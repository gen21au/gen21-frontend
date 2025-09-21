import React from 'react'
import { Order } from '@/types/orders'

interface RecentOrdersProps {
  orders: Order[]
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
      {orders.length === 0 ? (
        <p>No recent orders found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">Order #{order.id}</p>
                <p className="text-gray-600">
                  {order.e_service?.[0]?.name || 'N/A'} - {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.customer_request?.[0]?.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : order.customer_request?.[0]?.status === 'accept'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {order.customer_request?.[0]?.status || 'Pending'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
