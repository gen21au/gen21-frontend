'use client'

import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Order } from '@/types/orders'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface OrderChartProps {
  orders: Order[]
}

export default function OrderChart({ orders }: OrderChartProps) {
  const getChartData = () => {
    const monthlyOrders: { [key: string]: number } = {}

    orders.forEach((order) => {
      const date = new Date(order.created_at)
      const month = date.toLocaleString('default', { month: 'short' })
      const year = date.getFullYear()
      const key = `${month} ${year}`
      monthlyOrders[key] = (monthlyOrders[key] || 0) + 1
    })

    const labels = Object.keys(monthlyOrders).sort((a, b) => {
      const dateA = new Date(a)
      const dateB = new Date(b)
      return dateA.getTime() - dateB.getTime()
    })
    const data = labels.map((label) => monthlyOrders[label])

    return {
      labels,
      datasets: [
        {
          label: 'Orders per Month',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    }
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Order Trends',
      },
    },
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Order Trends</h2>
      <Bar data={getChartData()} options={options} />
    </div>
  )
}
