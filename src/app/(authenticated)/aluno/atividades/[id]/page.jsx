import Activity from '@/components/Activity'
import Main from '@/components/Main'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'

export async function generateStaticParams() {
  const response = await api.get(`/atividades`)

  const tasks = response.data

  return tasks.map((task) => ({
    id: task.id.toString(),
  }))
}

export default async function Atividade({ params }) {
  // Get user id
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token').value

  const userInfoResponse = await api.get(`/login`, {
    params: {
      token,
    },
  })

  const userId = userInfoResponse.data.sub

  // Get tasks
  const tasksResponse = await api.get(`/aluno/atividades?id=${userId}`)

  // Find page task
  const task = tasksResponse.data.find(
    (task) => task.id.toString() === params.id,
  )

  return (
    <Main>
      <Activity task={task} />
    </Main>
  )
}

export const dynamic = 'force-dynamic'
