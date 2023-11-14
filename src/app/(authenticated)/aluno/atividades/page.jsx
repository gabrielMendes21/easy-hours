import H1 from '@/components/H1'
import Main from '@/components/Main'
import TasksTab from '@/components/TasksTab'
import axios from 'axios'
import { cookies } from 'next/headers'

export default async function Atividades() {
  // Get the token
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token').value

  // Get the data from the token
  const userResponse = await axios(
    `${process.env.NEXT_PUBLIC_WEB_URL}api/login`,
    {
      params: {
        token,
      },
    },
  )

  // Now
  const now = new Date()
  now.setHours(now.getHours() - 3)

  // Get all tasks
  const tasksResponse = await axios(
    `${process.env.NEXT_PUBLIC_WEB_URL}api/aluno/atividades?id=${userResponse.data.sub}`,
  )

  const tasks = tasksResponse.data

  // Pending Tasks
  const pendingTasks = tasks.filter((task) => {
    // Task due date
    const taskDueDate = new Date(task.atividade.prazoEntrega)

    return task.entregue === false && taskDueDate > now
  })

  // Sent Tasks
  const sentTasks = tasks.filter((task) => task.entregue)

  // Overdue Tasks
  const overdueTasks = tasks.filter((task) => {
    // Task due date
    const taskDueDate = new Date(task.atividade.prazoEntrega)

    return taskDueDate < now && task.entregue === false
  })

  return (
    <Main>
      <H1 title="Atividades" />
      <TasksTab
        pendingTasks={pendingTasks}
        sentTasks={sentTasks}
        overdueTasks={overdueTasks}
      />
    </Main>
  )
}
