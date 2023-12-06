// import Link from "next/link"
// import { useContext } from "react"
// import { MenuContext } from "@/contexts/menuContext"

// export default function SideBar({ style }) {
//     const {isOpen, setIsOpen, handleMenu} = useContext(MenuContext)
//     console.log(setIsOpen)

//     return (
//         <nav style={style} className="absolute z-10 top-full transition-all py-9 px-6 bg-white h-screen w-screen">
//             <ul className="space-y-5">
//                 <li onClick={() => setIsOpen(false)}><Link href="/">Minhas horas</Link></li>
//                 <li onClick={() => setIsOpen(false)}><Link href="/atividades">Atividades</Link></li>
//                 <li onClick={() => setIsOpen(false)}><Link href="/reclamacoes">Reclamações</Link></li>
//                 <li onClick={() => setIsOpen(false)}><Link href="/profile">Meu perfil</Link></li>
//             </ul>
//         </nav>
//     )
// }
