export default function Report({ student }) {
  const year = new Date().getFullYear()

  // Get student data for report
  const tasks = student.Entrega
  const hours = student.Horas

  // Put student activity years in the table
  const studentClass = student.turma.nomeTurma.split('')[0]
  const studentActivityYears = []

  for (let i = 0; i < studentClass; i++) {
    studentActivityYears.push(year - i)
  }

  return (
    <table>
      <thead>
        <tr>
          <th className="border p-2"></th>
          {studentActivityYears.map((year) => {
            return (
              <th key={Math.random()} className="border p-2">
                {year}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="border p-2">Horas anuais</th>
          {studentActivityYears.map((year) => {
            return (
              <td key={Math.random()} className="border p-2">
                {hours.length > 0
                  ? (
                      hours.find((hour) => hour.ano === year) || {
                        horasAnuais: 0,
                      }
                    ).horasAnuais
                  : 0}
              </td>
            )
          })}
        </tr>
        <tr>
          <th className="border p-2">Horas concluídas</th>
          {studentActivityYears.map((year, index) => {
            return (
              <td key={Math.random()} className="border p-2">
                {hours.length > 0
                  ? (
                      hours.find((hour) => hour.ano === year) || {
                        horasConcluidas: 0,
                      }
                    ).horasConcluidas
                  : 0}
              </td>
            )
          })}
        </tr>
        <tr>
          <th className="border p-2">Atividades atribuídas</th>
          {studentActivityYears.map((year, index) => {
            const assignedTasks = tasks.reduce((acc, task) => {
              return new Date(task.atividade.prazoEntrega).getFullYear() ===
                year
                ? acc + 1
                : acc
            }, 0)

            return (
              <td key={Math.random()} className="border p-2">
                {assignedTasks}
              </td>
            )
          })}
        </tr>
        <tr>
          <th className="border p-2">Atividades concluídas</th>
          {studentActivityYears.map((year, index) => {
            const completed = tasks.reduce((acc, task) => {
              return new Date(task.atividade.prazoEntrega).getFullYear() ===
                year && task.entregue === true
                ? acc + 1
                : acc
            }, 0)

            return (
              <td key={Math.random()} className="border p-2">
                {completed}
              </td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}
