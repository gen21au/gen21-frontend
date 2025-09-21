import React from 'react'

interface InfoCardProps {
  title: string
  value: string
  icon: string
  color: string
}

export default function InfoCard({ title, value, icon, color }: InfoCardProps) {
  return (
    <div className={`p-6 rounded-lg shadow-md flex items-center space-x-4 ${color} text-white`} >
      <div className="text-4xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  )
}
