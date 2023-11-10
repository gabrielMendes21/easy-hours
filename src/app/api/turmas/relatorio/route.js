import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const classId = Number(searchParams.get('classId'))

  const students = await prisma.usuario.findMany({
    where: {
      codTurma: classId,
    },
    orderBy: {
      nome: 'asc',
    },
    include: {
      turma: {
        include: {
          escola: true,
        },
      },
      Horas: { orderBy: { ano: 'desc' } },
      Entrega: {
        include: {
          atividade: true,
        },
      },
    },
  })

  return NextResponse.json(students)
}
