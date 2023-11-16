import Card from '@/components/Card'
import Dropdown from '@/components/Dropdown'
import H1 from '@/components/H1'
import Main from '@/components/Main'
import NewButton from '@/components/NewButton'
import NewSupportRequestModal from '@/components/newSupportRequestModal'
import { api } from '@/lib/api'
import { auth } from '@/lib/auth'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Suporte() {
  // Get the token
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token').value

  const student = await auth(token)

  const responses = await Promise.all([
    api.get('/aluno/solicitacoesSuporte/respondidas', {
      params: {
        student: student.sub,
      },
    }),
    api.get('/aluno/solicitacoesSuporte/enviadas', {
      params: {
        student: student.sub,
      },
    }),
  ])

  const pendingSupportRequests = responses[1].data

  const answeredSupportRequests = responses[0].data

  return (
    <Main>
      <H1 title="Suporte" />

      {/* Complaints sent */}
      <Dropdown title="Solicitações enviadas">
        {pendingSupportRequests.length > 0 ? (
          pendingSupportRequests.map((supportRequest) => {
            return (
              <Link
                href={`suporte/${supportRequest.id}`}
                key={supportRequest.id}
              >
                <Card>
                  <span className="text-base">{supportRequest.titulo}</span>
                  <span>Aguardando resposta...</span>
                </Card>
              </Link>
            )
          })
        ) : (
          <span className="text-black/30 block">
            Você não possui nenhuma solicitação pendente
          </span>
        )}
      </Dropdown>

      {/* Complaints answered  */}
      <Dropdown title="Solicitações respondidas">
        {answeredSupportRequests.length > 0 ? (
          answeredSupportRequests.map((supportRequest) => {
            const answerDate = new Date(supportRequest.Resposta.dataResposta)
              .toLocaleString('pt-BR')
              .split(', ')[0]

            return (
              <Link
                href={`suporte/${supportRequest.id}`}
                key={supportRequest.id}
              >
                <Card>
                  <span className="text-base">{supportRequest.titulo}</span>
                  <span>Respondida em {answerDate}</span>
                </Card>
              </Link>
            )
          })
        ) : (
          <span className="text-black/30 block">
            Você não possui nenhuma solicitação respondida
          </span>
        )}
      </Dropdown>

      {/* New support request button */}
      <NewButton text="Nova solicitação" to="suporte/nova-solicitacao" />

      {/* Modal */}
      <NewSupportRequestModal />
    </Main>
  )
}
