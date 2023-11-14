'use client'

import { api } from '@/lib/api'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TaskDeliveryDate() {
  const [taskDeliveryDate, setTaskDeliveryDate] = useState('')

  const pathname = usePathname()
  const segments = pathname.split('/')
  const taskId = segments[segments.length - 3]
  const studentId = segments[segments.length - 1]

  useEffect(() => {
    api
      .get('/entrega', {
        params: {
          taskId,
          studentId,
        },
      })
      .then((response) =>
        setTaskDeliveryDate(new Date(response.data.dataEntrega)),
      )
      .catch((err) => console.log(err))
  }, [studentId, taskId])

  return (
    <span className=" text-black/60 block mb-7">
      {taskDeliveryDate
        ? `Entregue em ${taskDeliveryDate.toLocaleDateString()}`
        : 'Atividade pendente'}
    </span>
  )
}
