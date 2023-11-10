import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('id')

  const student = await prisma.usuario.findFirst({
    where: {
      id: Number(userId),
    },
    include: {
      Horas: {
        where: {
          ano: new Date().getFullYear(),
        },
      },
      Entrega: true,
    },
  })

  return NextResponse.json(student)
}

export async function POST(req) {
  // Get data from the form
  const student = await req.json()

  // Get class and school id passed by query params
  const { searchParams } = new URL(req.url)
  const classId = searchParams.get('class')
  const schoolId = searchParams.get('school')

  const password = student.rm + student.nome.slice(0, 2)
  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.usuario.create({
    data: {
      nome: student.nome,
      email: student.email,
      rm: Number(student.rm),
      senha: hashedPassword,
      codEscola: Number(schoolId),
      codTipoUsuario: 1,
      codTurma: Number(classId),

      Horas: {
        create: {
          horasAnuais: Number(student.horasAnuais),
          horasConcluidas: Number(student.horasConcluidas) ?? 0,
          ano: new Date().getFullYear(),
        },
      },
    },
  })

  return NextResponse.json('Cadastrado')
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get('studentId')
  const body = await req.json()

  await prisma.usuario.update({
    where: {
      id: Number(studentId),
    },
    data: {
      nome: body.nome,
      email: body.email,
      rm: Number(body.rm),
    },
  })

  return NextResponse.json('Aluno editado')
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get('studentId')

  // Remove student tasks
  const studentTasks = await prisma.entrega.findMany({
    where: {
      codAluno: Number(studentId),
    },
    include: {
      Correcao: true,
    },
  })

  if (studentTasks) {
    for (const task of studentTasks) {
      if (task.Correcao) {
        await prisma.correcao.delete({
          where: {
            codEntrega: task.id,
          },
        })
      }

      await prisma.entrega.delete({
        where: {
          id: task.id,
        },
      })
    }
  }

  // Remove student support requests
  const supportRequests = await prisma.solicitacaoSuporte.findMany({
    where: {
      codAluno: Number(studentId),
    },
    include: {
      Resposta: true,
    },
  })

  if (supportRequests) {
    for (const supportRequest of supportRequests) {
      if (supportRequest.Resposta) {
        await prisma.resposta.delete({
          where: {
            codSolicitacao: supportRequest.id,
          },
        })
      }

      await prisma.solicitacaoSuporte.delete({
        where: {
          id: supportRequest.id,
        },
      })
    }
  }

  // Remove student hours
  const studentHours = await prisma.horas.findMany({
    where: {
      codAluno: Number(studentId),
    },
  })

  if (studentHours) {
    for (const hours of studentHours) {
      await prisma.horas.delete({
        where: {
          id: hours.id,
        },
      })
    }
  }

  // Remove student
  await prisma.usuario.delete({
    where: {
      id: Number(studentId),
    },
  })

  return NextResponse.json('Aluno removido com sucesso')
}
