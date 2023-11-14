import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Card from './Card'
// import TradLink from './Link'

export default async function PendingSupportRequests({ coordinator }) {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token').value

  // Get the data from the token
  const userResponse = await api.get(`/login`, {
    params: {
      token,
    },
  })

  const user = userResponse.data

  const pendingRequestsResponse = await api.get(
    `/solicitacoesSuporte/pendentes?coordinatorId=${user.sub}`,
  )
  const pendingRequests = pendingRequestsResponse.data

  return (
    <>
      <div className="classes space-y-2">
        {pendingRequests.length === 0 ? (
          <span className="text-black/30 block">
            Você não possui nenhuma solicitação pendente
          </span>
        ) : (
          <>
            {pendingRequests.map((request) => {
              const creationDate = new Date(request.dataCriacao)
              const formattedDate = creationDate.toLocaleDateString()

              return (
                <Link
                  key={request.id}
                  href={`/coordenador-${coordinator}/suporte/${request.id}`}
                >
                  <Card>
                    <span className="text-base">{request.aluno.nome}</span>
                    <span>
                      {request.titulo} - {formattedDate}
                    </span>
                  </Card>
                </Link>
              )
            })}

            {/* See more link */}
            {/* <TradLink to={`/coordenador-${coordinator}/suporte`} size={10}>
              Ver mais
            </TradLink> */}
          </>
        )}
      </div>
    </>
  )
}
