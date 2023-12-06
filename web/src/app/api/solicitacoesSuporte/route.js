import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const supportRequests = await prisma.solicitacaoSuporte.findMany({
    include: {
      Resposta: true,
    },
  })

  return NextResponse.json(supportRequests)
}
