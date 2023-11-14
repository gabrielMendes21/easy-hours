'use client'

import lightLogo from '@/assets/light-logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Delay from './LoadDelay'

export default function Footer() {
  const pathname = usePathname()

  return pathname.includes('relatorio') ? (
    <></>
  ) : (
    <footer className="px-5 bg-[#262626] w-full py-10 self-end absolute text-white">
      <Delay className="flex justify-around flex-wrap">
        <div className="flex gap-5 md:gap-20 mb-5">
          {/* Schools */}
          <div className="">
            <h2 className="font-medium text-base mb-[14px]">Membros do AMS</h2>
            <ul className="text-xxs text-gray-200  font-thin space-y-3">
              <li>
                <a
                  href="https://www.eteczonaleste.com.br"
                  target="_blank"
                  className="hover:brightness-150"
                >
                  ETEC Zona Leste
                </a>
              </li>
              <li>
                <a
                  href="https://www.etecpa.com.br"
                  target="_blank"
                  className="hover:brightness-110"
                >
                  Etec Polivalente de Americana
                </a>
              </li>
            </ul>
          </div>
          <div>
            {/* Talk to a coordinator */}
            <h2 className="font-medium text-base mb-[14px]">
              Fale com um coordenador
            </h2>
            <ul className="text-xxs text-gray-200 font-thin space-y-3">
              <li>
                <a href="" target="_blank" className="hover:brightness-110">
                  guilherme@email.com
                </a>
              </li>
              <li>
                <a href="" target="_blank" className="hover:brightness-110">
                  rogerio@email.com
                </a>
              </li>
              <li>
                <a href="" target="_blank" className="hover:brightness-110">
                  coordenadoramericana@email.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Link href="/" className="grow-1 block">
          <Image src={lightLogo} alt="" priority />
        </Link>
      </Delay>
    </footer>
  )
}
