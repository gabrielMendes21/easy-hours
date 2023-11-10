import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get('student')

  let supportRequests = await prisma.solicitacaoSuporte.findMany({
    where: {
      codAluno: Number(studentId),
    },
    include: {
      Resposta: true,
    },
  })

  //   Get only sent and answered support requests
  supportRequests = supportRequests.filter(
    (supportRequest) => supportRequest.Resposta,
  )

  return NextResponse.json(supportRequests)
}
