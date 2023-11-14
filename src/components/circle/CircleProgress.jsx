'use client'

import { Check, Clock4, Percent } from 'lucide-react'
import './styles.css'

export default function CircleProgress({ unity, user }) {
  // const { user } = useContext(PageContext)
  const annualHours = user?.Horas
    ? user?.Horas[0].horasAnuais
    : user?.horasAnuais
  const hoursCompleted = user?.Horas
    ? user?.Horas[0].horasConcluidas
    : user?.horasConcluidas
  const percentage = Math.round((hoursCompleted / annualHours) * 100)
  const circleSize = '160'
  const radius = 68
  const dashArray = radius * Math.PI * 2
  const dashOffset = dashArray - (dashArray * percentage) / 100

  return (
    <div className="flex items-center justify-start gap-10 my-4">
      <div>
        <svg
          width={circleSize}
          height={circleSize}
          viewBox={`0 0 ${circleSize} ${circleSize}`}
        >
          <circle
            className="circle-background fill-none stroke-[#DDD]"
            cx={circleSize / 2}
            cy={circleSize / 2}
            strokeWidth="15px"
            r={radius}
          />
          <circle
            className="circle-progress fill-none stroke-highlighted "
            cx={circleSize / 2}
            cy={circleSize / 2}
            strokeWidth="15px"
            r={radius}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
            }}
            transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
          />
          <text
            x="53%"
            y="48%"
            dy="0.3em"
            textAnchor="middle"
            className="text-3xl font-semibold"
          >
            {percentage}%
          </text>
          <text
            x="50%"
            y="65%"
            dy="0.3em"
            textAnchor="middle"
            className="text-xs"
          >
            {hoursCompleted}/{annualHours} {unity}
          </text>
        </svg>
      </div>

      <ul className="space-y-4 lg:text-center">
        <li className="flex items-center text-left gap-3 text-xxs lg:text-xs">
          <Check color="#0F62FE" />
          {hoursCompleted} Horas concluídas
        </li>
        <li className="flex items-center gap-3 text-left text-xxs lg:text-xs">
          <Clock4 color="#0F62FE" />
          {annualHours - hoursCompleted} horas restantes
        </li>
        <li className="flex items-center gap-3 text-left text-xxs lg:text-xs">
          <Percent color="#0F62FE" />
          {percentage}% do caminho
        </li>
      </ul>
    </div>
  )
}
