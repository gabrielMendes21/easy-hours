import Classes from '../Classes'
import Main from '../Main'
import PendingSupportRequests from '../PendingSupportRequests'
import UserInfo from '../UserInfo'

export default async function ETECCoordinatorHome() {
  return (
    <Main>
      {/* Coordinator info */}
      <UserInfo />

      {/* Classes */}
      <h2 className="text-base py-7 md:text-2xl">Turmas</h2>
      <Classes />

      <hr className="border-[#C6C6C6] mt-7" />

      {/* Support requests */}
      <h2 className="text-base py-7 md:text-2xl">Solicitações de suporte</h2>
      <PendingSupportRequests coordinator="ETEC" />
    </Main>
  )
}
