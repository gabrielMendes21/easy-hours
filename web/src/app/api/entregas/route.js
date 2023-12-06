import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const taskId = searchParams.get('taskId')

  let taskDeliveries = []

  if (taskId) {
    taskDeliveries = await prisma.entrega.findMany({
      where: {
        atividade: {
          id: Number(taskId),
        },
      },
      include: {
        atividade: true,
        Correcao: true,
        aluno: {
          include: {
            turma: {
              include: {
                escola: true,
              },
            },
          },
        },
      },
    })
  } else {
    taskDeliveries = await prisma.entrega.findMany()
  }

  return NextResponse.json(taskDeliveries)
}
