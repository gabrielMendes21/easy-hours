'use client'

import { PageContext } from '@/app/context/PageContext'
import Header from '@/components/Header'
import LoadingIcon from '@/components/LoadingIcon'
import LoginErrorMessages from '@/components/LoginErrorMessages'
import Main from '@/components/Main'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import darkLogo from '../../../assets/dark-logo.svg'

export default function Login() {
  const [error, setError] = useState('')
  const [icon, setIcon] = useState(<ArrowRight strokeWidth={1} />)
  const { login } = useContext(PageContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data, event) => {
    event.preventDefault()
    try {
      setIcon(<LoadingIcon color="#FFF" />)
      const message = await login(data)
      setError(message)
    } catch (err) {
      console.log(err)
    } finally {
      setIcon(<ArrowRight strokeWidth={1} />)
    }
  }

  return (
    <>
      <Header className="md:invisible" />
      <Main className="mt-5">
        <div className="md:flex md:justify-center md:items-center md:gap-20 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-3/5">
          {/* Logo */}
          <div>
            <Image
              src={darkLogo}
              alt=""
              className="invisible md:visible w-[350px]"
            />

            <h1 className="invisible absolute md:visible md:static text-xl">
              Efetue login no Easy Hours
            </h1>

            <div>
              <h1 className="text-xl py-7 md:text-2xl text-center md:absolute md:invisible pt-0">
                Efetue login no Easy Hours
              </h1>
              <hr className="border-[#C6C6C6] md:absolute md:invisible pt-0" />
            </div>
          </div>

          {/* Form */}
          <div className="grow">
            {error && <LoginErrorMessages>{error}</LoginErrorMessages>}
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
              className="pt-5"
              id="login-form"
            >
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-3 border-b block border-black w-full bg-[#F4F4F4] focus:outline-highlighted rounded-none p-2"
                placeholder="Digite seu email"
                {...register('email', {
                  required: true,
                  pattern: /.*@.*\.*/i,
                })}
              />
              {errors.email?.type === 'required' && (
                <p role="alert" className="text-red-500 text-xs font-bold mt-2">
                  *Não deixe o campo vazio
                </p>
              )}
              {errors.email?.type === 'pattern' && (
                <p role="alert" className="text-red-500 text-xs font-bold mt-2">
                  *Exemplo: nome@dominio.com
                </p>
              )}

              <label htmlFor="password" className="mt-8 text-sm inline-block">
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="mt-3 border-b block border-black w-full bg-[#F4F4F4] focus:outline-highlighted rounded-none p-2"
                placeholder="Digite sua senha"
                {...register('password', { required: true, minLength: 6 })}
              />
              {errors.password?.type === 'required' && (
                <p
                  role="alert"
                  className="text-red-500 text-xs font-bold mb-8 mt-2"
                >
                  *Não deixe o campo vazio
                </p>
              )}
              {errors.senha?.type === 'minLength' && (
                <p
                  role="alert"
                  className="text-red-500 text-xs font-bold mb-8 mt-2"
                >
                  *Sua senha deve ter no mínimo 6 caracteres
                </p>
              )}

              <button
                id="submit-button"
                className="flex justify-between items-center w-full text-left font-light bg-highlighted hover:brightness-110 transition-color text-white mb-2 mt-8 p-3"
              >
                Entrar
                {icon}
              </button>
            </form>

            <hr className="border-[#C6C6C6 mt-9 mb-5" />

            {/* <span className="text-xs">
              Esqueceu a senha?{' '}
              <Link
                href="mailto:teste@gmail.com"
                className="text-highlighted hover:brightness-110 "
              >
                Entre em contato com um coordenador
              </Link>
            </span> */}
          </div>
        </div>
      </Main>
    </>
  )
}
