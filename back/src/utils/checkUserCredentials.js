import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'

export default async function checkUserCredentials(email, password) {
    // FIND THE USER WHO OWNS THE EMAIL
    // IF THE EMAIL PROVIDED WAS NOT FOUND, THE USER VAR WILL RECEIVE A NULL VALUE
    const user = await prisma.usuario.findFirst({
        where: {
          email,
        },
        include: {
          escolaRel: true,
          turma: true,
        },
      })
  
      // VERIFY IF USER EXISTS
      if (user) {
        // IF USER EXISTS, VERIFY ITS PASSWORD
        const passwordIsCorrect = await bcrypt.compare(password, user.senha)
        if (passwordIsCorrect) {
            return user
        } else { 
          return false
        }
      } else { // IF USER IS NULL, IT MEANS HE DOES NOT EXISTS IN DATABASE   
        return false
      }
}