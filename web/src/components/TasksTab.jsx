'use client'

import Link from 'next/link'
import Task from './Task'

export default function TasksTab({ pendingTasks, sentTasks, overdueTasks }) {
  const handleTab = (e) => {
    const tabButtons = Array.from(e.target.parentNode.children)

    const tabsContent = Array.from(
      e.target.parentNode.parentNode.children,
    ).slice(1)

    tabsContent.forEach((tab) => {
      tab.classList.add('invisible', 'absolute', 'w-0')
    })

    const tabContent = tabsContent.find((content) => {
      return content.classList.contains(e.target.classList.item(2))
    })

    tabContent.className = `static m-5 ${e.target.classList.item(2)}`

    tabButtons[tabButtons.length - 1].style.width = `${e.target.offsetWidth}px`
    tabButtons[tabButtons.length - 1].style.left = `${e.target.offsetLeft}px`
  }

  return (
    <div>
      <div className="relative">
        <button className="px-3 mt-5 pending" onClick={handleTab}>
          Pendentes
        </button>
        <button className="px-3 mt-5 sent" onClick={handleTab}>
          Entregues
        </button>
        <button className="px-3 mt-5 overdue" onClick={handleTab}>
          Atrasadas
        </button>
        <div className="absolute top-12 left-0 w-[105px] h-1 bg-highlighted transition-all"></div>
      </div>

      {/* Pending tasks */}
      <div className="static m-5 pending">
        {pendingTasks.length === 0 ? (
          <span className="text-black/60">
            Você não possui atividades pendentes
          </span>
        ) : (
          pendingTasks.map((task) => {
            return (
              <Link href={`/aluno/atividades/${task.id}`} key={task.id}>
                <Task
                  name={task.atividade.titulo}
                  hours={task.atividade.horasAtividade}
                  dueDate={
                    new Date(task.atividade.prazoEntrega)
                      .toLocaleString('pt-BR')
                      .split(', ')[0]
                  }
                />
              </Link>
            )
          })
        )}
      </div>

      {/* Sent tasks */}
      <div className="invisible absolute w-0 sent">
        {sentTasks.length === 0 ? (
          <span className="text-black/60">
            Você não possui atividades entregues
          </span>
        ) : (
          sentTasks.map((task) => {
            return (
              <Link href={`/aluno/atividades/${task.id}`} key={task.id}>
                <Task
                  name={task.atividade.titulo}
                  hours={task.atividade.horasAtividade}
                  dueDate={
                    new Date(task.atividade.prazoEntrega)
                      .toLocaleString('pt-BR')
                      .split(', ')[0]
                  }
                />
              </Link>
            )
          })
        )}
      </div>

      {/* Overdue Tasks */}
      <div className="invisible absolute w-0 overdue">
        {overdueTasks.length === 0 ? (
          <span className="text-black/30 block">
            Você não possui nenhuma atividade atrasada
          </span>
        ) : (
          overdueTasks.map((task) => {
            return (
              <Link href={`/aluno/atividades/${task.id}`} key={task.id}>
                <Task
                  name={task.atividade.titulo}
                  hours={task.atividade.horasAtividade}
                  dueDate={
                    new Date(task.atividade.prazoEntrega)
                      .toLocaleString('pt-BR')
                      .split(', ')[0]
                  }
                />
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
