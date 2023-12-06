import UserInfo from '../UserInfo'
import Main from '../Main'
import SchoolsAndClasses from '../SchoolsAndClasses'

export default async function IBMCoordinatorHome() {
  return (
    <Main>
      {/* Coordinator info */}
      <UserInfo />

      {/* Schools */}
      <h2 className="text-base md:text-2xl mt-5 mb-8">Escolas</h2>

      <SchoolsAndClasses />
    </Main>
  )
}
