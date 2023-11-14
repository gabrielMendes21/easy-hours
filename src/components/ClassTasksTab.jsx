import Link from 'next/link'
import Task from './Task'

export default function ClassTasksTab({ classesTasks, schoolName }) {
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

  function removeRepeatedTasks(array, propriedade) {
    return new Set(array.map((item) => item[propriedade]))
  }

  const schoolTasks = classesTasks.filter(
    (classTask) => classTask.escola.nomeEscola === schoolName,
  )

  return (
    <>
      {/* Create a nav button for each class */}
      <div className="relative">
        {schoolTasks.map((classTask) => {
          return (
            <button
              className={`px-3 mt-0 ${classTask.id}`}
              onClick={handleTab}
              key={classTask.id}
            >
              {classTask.nomeTurma}
            </button>
          )
        })}
        {/* Nav Line */}
        <div className="absolute top-7 left-0 w-[110px] h-1 bg-highlighted transition-all"></div>
      </div>
      {schoolTasks.map((classTask, index) => {
        let tasks = []
        classTask.Usuario.map((student) => {
          return student.Entrega.map((task) => {
            return tasks.push(task.atividade)
          })
        })
        const tasksId = removeRepeatedTasks(tasks, 'id')

        tasks = [...tasksId].map((id) => {
          return tasks.find((item) => item.id === id)
        })

        return (
          <div
            key={classTask.id}
            className={`${index === 0 ? 'static m-5' : 'invisible absolute'} ${classTask.id
              }`}
          >
            {tasks.length === 0 ? (
              <span className="text-black/60">
                Essa turma não possui atividades
              </span>
            ) : (
              tasks.map((task) => {
                return (
                  <Link
                    href={`/coordenador-IBM/atividades/${task.id}`}
                    key={task.id}
                  >
                    <Task
                      name={task.titulo}
                      hours={task.horasAtividade}
                      dueDate={
                        new Date(task.prazoEntrega)
                          .toLocaleString('pt-BR')
                          .split(', ')[0]
                      }
                    />
                  </Link>
                )
              })
            )}
          </div>
        )
      })}
    </>
  )
}
