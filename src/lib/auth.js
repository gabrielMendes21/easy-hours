import { api } from './api'

export async function auth(token) {
  const response = await api.get('/login', {
    params: {
      token,
    },
  })

  return response.data
}
