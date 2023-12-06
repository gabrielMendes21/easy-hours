import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Card from './Card'

export default async function Classes() {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token').value

  // Get user information by sending the token in the cookies
  const userInfoResponse = await api.get(`/login`, {
    params: {
      token,
    },
  })

  const user = userInfoResponse.data

  console.log(user)

  // Get the school's classes
  const classesResponse = await api.get(
    `/escolas/turmas?school=${user.escola.codEscola}`,
  )

  const classes = classesResponse.data

  return (
    <>
      <div className="classes space-y-2">
        {classes.map((schoolClass) => {
          return (
            <Link
              href={`/coordenador-ETEC/turma/${schoolClass.id}`}
              key={schoolClass.id}
            >
              <Card>
                <span className="text-base">{schoolClass.nomeTurma}</span>
                <span>{schoolClass.ano}</span>
              </Card>
            </Link>
          )
        })}
        {/* <Link href="/coordenador-ETEC/turma/turma1">
          <Card>
            <span className="text-base">1º AMS - FATEC</span>
            <span>2023</span>
          </Card>
        </Link>
        <Card>
          <span className="text-base">2º AMS - FATEC</span>
          <span>2023</span>
        </Card>
        <Card>
          <span className="text-base">3º AMS - FATEC</span>
          <span>2023</span>
        </Card> */}
      </div>
    </>
  )
}
