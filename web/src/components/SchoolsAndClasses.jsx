import { api } from '@/lib/api'
import Link from 'next/link'
import Card from './Card'
import Dropdown from './Dropdown'
import NewButton from './NewButton'
import NewSchoolModal from './NewSchoolModal'

export default async function SchoolsAndClasses() {
  const schoolsResponse = await api.get('/escolas')
  const schools = schoolsResponse.data

  return (
    <>
      {schools.map((school) => {
        return (
          <>
            <Dropdown title={school.nomeEscola}>
              {school.Turma.length === 0 ? (
                <span className="text-black/60">
                  Não existem turmas nesta escola
                </span>
              ) : (
                school.Turma.map((turma) => {
                  return (
                    <Link
                      key={turma.id}
                      href={`/coordenador-IBM/turma/${turma.id}`}
                    >
                      <Card>
                        <span className="text-base">{turma.nomeTurma}</span>
                        <span>{turma.ano}</span>
                      </Card>
                    </Link>
                  )
                })
              )}
            </Dropdown>
          </>
        )
      })}
      <NewButton to="/coordenador-IBM/nova-escola" text="Adicionar escola" />
      <NewSchoolModal />
    </>
  )
}
