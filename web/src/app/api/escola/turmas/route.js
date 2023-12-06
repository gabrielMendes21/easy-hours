import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const schoolId = searchParams.get('schoolId')

  const classesAndTasks = await prisma.turma.findMany({
    where: {
      ano: new Date().getFullYear(),
      AND: {
        codEscola: Number(schoolId),
      },
    },
    include: {
      Usuario: {
        include: {
          Entrega: {
            include: {
              atividade: true,
            },
          },
        },
      },
    },
  })

  return NextResponse.json(classesAndTasks)
}
