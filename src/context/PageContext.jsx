'use client'
import { api } from '@/lib/api'
import { usePathname, useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, useEffect, useState } from 'react'

export const PageContext = createContext({})

export function PageContextProvider({ children }) {
  const [user, setUser] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const handleMenu = () => setIsOpen(!isOpen)

  const router = useRouter()
  const pathname = usePathname()

  // Login function => Called by the login page only
  async function login({ email, password }) {
    // Login request
    try {
      const loginResponse = await api.post('/login', {
        email,
        password,
      })

      // Get the token and the user info
      const { token, user } = loginResponse.data

      // Create the auth cookie
      setCookie(null, 'auth-token', token, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })

      // Redirect to user dashboard
      if (user.tipoUsuario === 'Coordenador ETEC') {
        router.push('/coordenador-ETEC/dashboard')
      } else if (user.codTipoUsuario === 'Coordenador IBM') {
        router.push('/coordenador-IBM/dashboard')
      } else {
        router.push('/')
      }
    } catch (err) {
      return err.response.data.error
    }
  }

  // Logout function
  function logout() {
    destroyCookie(null, 'auth-token')
    router.push('/login')
  }

  // Take the JWT (if it exists) and return the user data
  useEffect(() => {
    const { 'auth-token': token } = parseCookies()

    if (pathname !== '/login') {
      if (token) {
        if (
          pathname === '/' ||
          pathname === '/coordenador-ETEC/dashboard' ||
          pathname === '/coordenador-IBM/dashboard'
        ) {
          api
            .get('/login', {
              params: { token },
            })
            .then((response) => {
              if (response.data.tipoUsuario === 'Coordenador ETEC') {
                router.push('/coordenador-ETEC/dashboard')
              } else if (response.data.tipoUsuario === 'Coordenador IBM') {
                router.push('/coordenador-IBM/dashboard')
              } else {
                router.push('/')
              }
            })
        }
      }
      // axios('../api/login', {
      //   headers: {
      //     Authorization: `bearer ${token}`,
      //   },
      // })
      api
        .get('/login', {
          params: {
            token,
          },
        })
        .then((response) => {
          setUser(response.data)
        })
        .catch((err) => {
          console.log(err)
          router.push('/')
        })
    }
  }, [router, pathname])

  return (
    <PageContext.Provider
      value={{ login, user, isOpen, setIsOpen, handleMenu, logout }}
    >
      {children}
    </PageContext.Provider>
  )
}
