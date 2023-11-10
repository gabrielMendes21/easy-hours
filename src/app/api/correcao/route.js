import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const data = await req.json()
  const { searchParams } = new URL(req.url)
  const taskDeliveryId = searchParams.get('taskDeliveryId')
  const coordinatorId = searchParams.get('coordinatorId')

  const isApproved = data.taskVal === 'approve'

  await prisma.correcao.create({
    data: {
      codEntrega: Number(taskDeliveryId),
      conteudo: data.assessment,
      codCoordenador: Number(coordinatorId),
      entregaAprovada: !!isApproved,
    },
  })

  if (isApproved) {
    const taskDelivery = await prisma.entrega.findFirst({
      where: {
        id: Number(taskDeliveryId),
      },
      include: {
        atividade: true,
        aluno: {
          include: {
            Horas: true,
          },
        },
      },
    })

    const hours = taskDelivery.aluno.Horas.find((hours) => {
      return hours.ano === new Date().getFullYear()
    })

    const completedHours = hours.horasConcluidas

    await prisma.horas.update({
      data: {
        horasConcluidas: completedHours + taskDelivery.atividade.horasAtividade,
      },
      where: {
        id: hours.id,
      },
    })
  }

  return NextResponse.json('Sucesso')
}
