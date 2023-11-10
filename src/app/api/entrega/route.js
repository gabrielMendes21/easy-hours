import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const taskDeliveryId = searchParams.get('taskDeliveryId')

  const taskDelivery = await prisma.entrega.findFirst({
    where: {
      id: Number(taskDeliveryId),
    },
    include: {
      aluno: true,
      atividade: true,
      Correcao: true,
    },
  })

  console.log(taskDelivery)

  return NextResponse.json(taskDelivery)
}
