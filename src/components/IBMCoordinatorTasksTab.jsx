'use client'

import ClassTasksTab from './ClassTasksTab'
import Dropdown from './Dropdown'

export default function ETECCoordinatorTasksTab({ classesTasks, schools }) {
  return (
    <div>
      {schools.map((school) => {
        return (
          <Dropdown key={school.id} title={school.nomeEscola}>
            <ClassTasksTab
              classesTasks={classesTasks}
              schoolName={school.nomeEscola}
            />
          </Dropdown>
        )
      })}
    </div>
  )
}
