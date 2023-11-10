import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const taskId = searchParams.get('taskId')

  const task = await prisma.atividade.findFirst({
    where: {
      id: Number(taskId),
    },
    include: {
      tipoAtividade: true,
    },
  })

  return NextResponse.json(task)
}

export async function POST(req) {
  const data = await req.json()

  const newTask = await prisma.atividade.create({
    data: {
      titulo: data.taskName,
      descricao: data.taskDetails,
      prazoEntrega: new Date(data.taskDueDate),
      horasAtividade: Number(data.taskHours),
      codTipoAtividade: Number(data.taskType),
    },
  })

  const turma = await prisma.turma.findFirst({
    where: {
      nomeTurma: {
        contains: data.class,
      },
      AND: {
        ano: new Date().getFullYear(),
      },
    },
  })

  const students = await prisma.usuario.findMany({
    where: {
      codTurma: turma.id,
    },
  })

  if (students) {
    for (const student of students) {
      await prisma.entrega.create({
        data: {
          codAluno: student.id,
          codAtividade: newTask.id,
        },
      })
    }
  }

  return NextResponse.json('Atividade criada', { status: 201 })
}
