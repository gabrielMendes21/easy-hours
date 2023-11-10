import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
  // Support request id
  const { searchParams } = new URL(req.url)
  const supportRequestId = searchParams.get('requestId')
  const coordinatorId = searchParams.get('coordinatorId')

  // Request body
  const body = await req.json()

  await prisma.resposta.create({
    data: {
      resposta: body.responseMessage.trim(),
      codCoordenador: Number(coordinatorId),
      codSolicitacao: Number(supportRequestId),
    },
  })

  return NextResponse.json('Pronto')
}
