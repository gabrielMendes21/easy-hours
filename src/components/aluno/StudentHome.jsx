import Main from '../Main'
import UserInfo from '../UserInfo'
import CircleProgress from '../circle/CircleProgress'
import PendingTasks from '../PendingTasks'
import { cookies } from 'next/headers'
import { api } from '@/lib/api'

export default async function StudentHome() {
  // Get student info for circle progress
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token').value

  const userInfoResponse = await api.get(`/login`, {
    params: {
      token,
    },
  })

  const student = userInfoResponse.data

  return (
    <Main>
      {/* Student info */}
      <UserInfo />
      <div className="lg:flex lg:justify-center lg:mt-12">
        {/* Pending Tasks */}
        <PendingTasks />

        <hr className="border-[#C6C6C6] my-4 lg:rotate-90 lg:w-72 lg:self-center" />

        <div className="progress-info">
          {/* Progress info */}
          <h2 className="text-base lg:text-2xl mt-5 mb-8">
            Horas anuais concluídas
          </h2>

          <div className="flex items-center justify-start gap-10 my-4">
            <CircleProgress unity="horas" user={student} />
          </div>
        </div>
      </div>
    </Main>
  )
}
