import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Card from './Card'

export default async function AnsweredSupportRequests({ coordinator }) {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token').value

  // Get the data from the token
  const userResponse = await api.get(`/login`, {
    params: {
      token,
    },
  })

  const user = userResponse.data

  const answeredRequestsResponse = await api.get(
    `/solicitacoesSuporte/respondidas?coordinatorId=${user.sub}`,
  )
  const answeredRequests = answeredRequestsResponse.data

  return (
    <>
      <div className="classes space-y-2">
        {answeredRequests.length === 0 ? (
          <span className="text-black/30 block">
            Você não possui nenhuma solicição Respondida
          </span>
        ) : (
          answeredRequests.map((request) => {
            const answerDate = new Date(request.Resposta.dataResposta)
            const formattedDate = answerDate.toLocaleDateString()

            return (
              <Link
                href={`/coordenador-${coordinator}/suporte/${request.id}`}
                key={request.id}
              >
                <Card>
                  <span className="text-base">{request.aluno.nome}</span>
                  <span>
                    {request.titulo} - respondida em: {formattedDate}
                  </span>
                </Card>
              </Link>
            )
          })
        )}
      </div>
    </>
  )
}
