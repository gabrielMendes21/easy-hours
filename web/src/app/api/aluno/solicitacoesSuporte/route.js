import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get('student')

  const supportRequests = await prisma.solicitacaoSuporte.findMany({
    where: {
      codAluno: Number(studentId),
    },
    include: {
      Resposta: true,
    },
  })

  return NextResponse.json(supportRequests, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
