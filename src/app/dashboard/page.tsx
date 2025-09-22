'use client'

import { useEffect, useState } from 'react'
import { RootState, useAppSelector } from '@/store/store'
import InfoCard from '@/components/Dashboard/InfoCard'
import OrderChart from '@/components/Dashboard/OrderChart'
import RecentOrders from '@/components/Dashboard/RecentOrders'
// import { Order } from '@/types/orders'
import { useGetOrdersQuery } from '@/store/apiSlice' // Import the new hook
import Spinner from '@/components/Common/Spinner';

export default function DashboardPage() {
  const { accessToken: token } = useAppSelector((state: RootState) => state.auth);
  const { data: orders = [], isLoading: loading, error } = useGetOrdersQuery(token || '', {
    skip: !token, // Skip the query if token is not available
  });

  useEffect(() => {
    if (error) {
      console.error('Failed to fetch orders:', error);
    }
  }, [error]);

  if (loading) {
    return <Spinner />;
  }

  const totalOrders = orders.length
  const completedOrders = orders.filter(order => 
    order.customer_request?.some(req => req.status === 'completed')
  ).length
  const pendingOrders = orders.filter(order => 
    order.customer_request?.some(req => req.status === 'pending' || req.status === 'accept')
  ).length

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard 
          title="Total Orders" 
          value={totalOrders.toString()} 
          icon="📋" 
          color="bg-blue-500" 
        />
        <InfoCard 
          title="Completed Orders" 
          value={completedOrders.toString()} 
          icon="✅" 
          color="bg-green-500" 
        />
        <InfoCard 
          title="Pending Orders" 
          value={pendingOrders.toString()} 
          icon="⏳" 
          color="bg-yellow-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderChart orders={orders} />
        <RecentOrders orders={orders.slice(0, 5)} />
      </div>
    </div>
  )
}
