import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const supportRequestId = searchParams.get('id')

  const supportRequest = await prisma.solicitacaoSuporte.findFirst({
    where: {
      id: Number(supportRequestId),
    },
    include: {
      Resposta: {
        include: {
          coordenador: {
            select: {
              nome: true,
              tipoUsuario: true,
            },
          },
        },
      },
      aluno: {
        select: {
          nome: true,
          turma: {
            include: {
              escola: true,
            },
          },
        },
      },
    },
  })

  return NextResponse.json(supportRequest)
}

export async function POST(req) {
  // Student id as a query param
  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get('studentId')

  // Data sent from form
  const newSupportRequest = await req.json()

  await prisma.solicitacaoSuporte.create({
    data: {
      titulo: newSupportRequest.subject,
      conteudo: newSupportRequest.message.trim(),
      codAluno: Number(studentId),
    },
  })

  return NextResponse.json('Cadastrado')
}
